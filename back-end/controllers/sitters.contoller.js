const { differenceInDays } = require('../utils/helpers');
const { Sitter, Service, SitterService, Pet, SitterCriteria, Schedule, TimeRange } = require('../utils/models');
const { ValidationError, ResourceError } = require('../utils/errors');
const messages = require('../utils/thrown-error-messages');
const sequelize = require('../utils/database-connection');
const { ConnectionTimedOutError } = require('sequelize');

async function checkCandidate(req, res)
{
    const userId = req.userData.userId;

    const user = await Sitter.findOne({where: { userId }});
    if(!user) res.status(200).send({ success: true }) 
    
    if(user.status == 'Approved') return res.status(400).send({ success: false, message: messages.approvedUser });
    else if(user.status == 'Candidate') return res.status(400).send({ success: false, message: messages.stillCandidateUser });

    const days = differenceInDays(user.updatedAt);
    if(days < 5) return res.status(400).send({ success: false, message:'Unfortunately you were not approved and you have to wait ' + (5 - days) + ' days for new candidature '});

    res.status(200).send({ success: true }) 
}

async function postCandidates(req, res)
{
    const { about, city } = req.body;
    const userId = req.userData.userId;
    const user = await Sitter.findOne({where: { userId }});

    if(!user)
    {
        await Sitter.create(
        {
            userId, about, city
        });

        return res.status(201).send({ success: true, message: messages.candidateUser });
    }

    user.about = about;
    user.city = city;
    user.save();

    return res.status(200).send({ success: true, message: messages.candidateUser });
}

async function getCandidates(req, res)
{
    const page = +req.query.page || 1;
    const candidatesPerPage = 5;

    const totalCandidates = await Sitter.count(
    {
        where: {status: 'Candidate'}
    });

    const candidates = await Sitter.findAll(
    {
        offset: (page - 1) * candidatesPerPage,
        limit: candidatesPerPage,
        where: 
        {
            status: 'Candidate'
        }
    });

    const result = {}
    if(page * candidatesPerPage < totalCandidates)
    {
        result.nextPageNumber = page +1;
    }

    res.status(200).send(
    {
        success: true, 
        nextPage: page * candidatesPerPage < totalCandidates,
        result,   
        candidates
    });
}

async function getSitterServices(req, res)
{
    const sitterId = req.userData.sitterId;

    const services = await Service.findAll(
    { 
        attributes: { exclude:['createdAt', 'updatedAt'] },
        order: [['serviceType', 'ASC']],
        include: 
        {
            model: SitterService, 
            where: { sitterId },
            required: false,
            attributes: { exclude:['sitterId', 'createdAt', 'updatedAt'] },
        },
    }); 

    res.status(200).send({ success: true, services }); 
}

async function putSitterServices(req, res)
{
    const sitterId = req.userData.sitterId;
    const { data } = req.body;

    for(const serviceId in data) 
    {
        const service = await SitterService.findOne({ where: { serviceId, sitterId } });

        if(data[serviceId].isEnabled == false) 
        {
            await SitterService.destroy({where: { id: service.id }});
        }
        else if(!service && data[serviceId].isEnabled == true)
        {
            await SitterService.create(
            {
                sitterId, serviceId,
                price: data[serviceId].price
            })
        }
        else
        {
            service.price = data[serviceId].price;
            service.save();
        }
    } 
  
    res.status(200).send({ success: true });
}

async function getSitterPets(req, res)
{
    const sitterId = req.userData.sitterId;

    const pets = await Pet.findAll(
    { 
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['petName', 'ASC']],
        include: 
        {
            model: SitterCriteria, 
            where: { sitterId },
            required: false,
            attributes: { exclude: ['sitterId', 'createdAt', 'updatedAt'] },
        },
    }); 

    res.status(200).send({ success: true, pets }); 
}

async function putSitterPets(req, res)
{
    const sitterId = req.userData.sitterId;
    const { data } = req.body;
    
    for(const petId in data) 
    {
        if(data[petId].isEnabled == false)
        {
            await SitterCriteria.destroy({ where: { sitterId, petId } });
            continue;
        }

        await SitterCriteria.create({ sitterId, petId });
    } 
  
    res.status(200).send({ success: true });
}

async function getServiceTimeRanges(req, res)
{
    const services = await Service.findAll(
    {
        attributes: { exclude: ['serviceType', 'createdAt', 'updatedAt'] },
        where: { serviceType: 'Main' },
        include: 
        { 
            model: TimeRange,
            attributes: 
            [
                'id', 
                [sequelize.fn('DATE_FORMAT', sequelize.col('start_hour'), '%H:%i'), 'startHour'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('end_hour'), '%H:%i'), 'endHour'],
            ] 
            
        },
        order: [[sequelize.col('time_ranges.start_hour'), 'ASC']]
    });
    
    res.status(200).send({ success: true , services }); 
}

async function putSitterSchedule(req, res)
{
    const { firstDay, lastDay, serviceId, timeRanges } = req.body;
    const sitterId = req.userData.sitterId;

    for (var date = new Date(firstDay); date <= new Date(lastDay); date.setDate(date.getDate() + 1)) 
    {
        for(const timeRangeId in timeRanges)
        {
            await Schedule.findOrCreate({where: { sitterId, date, serviceId, timeRangeId }});
        }
    }

    res.status(201).send({success: true});
}

async function getSitterSchedule(req, res)
{
    const sitterId = req.userData.sitterId;
    const page = +req.query.page || 1;
    const daysPerPage = 5;
    let dates = [];
    let updatedSchedules = [];

    const countDifferentDates = await Schedule.count(
    {
        where: { sitterId },
        distinct: true, 
        col: 'date',
    });
    
    if(!countDifferentDates) return res.status(200).send({ success: true, schedules: []});
      
    const differentDates = await Schedule.findAll(
    {
        where: { sitterId },
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('date')) ,'date']], 
        order: [[sequelize.col('schedules.date'), 'ASC']],
        offset: (page - 1) * daysPerPage,
        limit: daysPerPage
    });

    differentDates.forEach(date => 
    {
        dates.push(date.date);
        updatedSchedules = [...updatedSchedules, {date: date.date}];
    });

    const services = await Service.findAll(
    {
        attributes: { exclude: ['serviceType', 'createdAt', 'updatedAt'] },
        where: { serviceType: 'Main' },
        include:
        [
            {
                model: Schedule,
                where: { date: dates, sitterId },
                required: false,
                include: 
                { 
                    model: TimeRange,
                    attributes: 
                    [
                        'id', 
                        [sequelize.fn('DATE_FORMAT', sequelize.col('start_hour'), '%H:%i'), 'startHour'],
                        [sequelize.fn('DATE_FORMAT', sequelize.col('end_hour'), '%H:%i'), 'endHour'],
                    ] 
                },        
                attributes: ['id', 'date']
            },
            
        ],
        order: 
        [
            [sequelize.col('schedules.date'), 'ASC'],
            [sequelize.col('schedules->time_range.start_hour'), 'ASC'],
        ],
    });

    let dateIndex;

    for(const service of services)
    {
        for(const date of dates) 
        {
            dateIndex = dates.indexOf(date);
            updatedSchedules[dateIndex] = {...updatedSchedules[dateIndex], [service.serviceName]: []};
            for(const schedule of service.schedules)
            {
                if(date != schedule.date) continue;

                updatedSchedules[dateIndex][service.serviceName].push({...schedule.time_range.get({plain: true})});
            }
        }
    }

    let nextPage; 
    let hasNextPage = page * daysPerPage < countDifferentDates;
    
    if(hasNextPage)
    {
        nextPage = page + 1;
    }
    
    res.status(200).send(
    { 
        success: true, 
        schedules: updatedSchedules,
        nextPage,
        hasNextPage
    });
}

async function getServices(req, res)
{
    const services = await Service.findAll(
    {
        attributes: ['id', 'serviceName'],
        where: { serviceType: 'Main' }
    });

    res.status(200).send({ success: true, services });
}

module.exports = 
{
    postCandidates, getCandidates, checkCandidate, getSitterServices, putSitterServices,
    getSitterPets, putSitterPets, getServiceTimeRanges, putSitterSchedule, getSitterSchedule,
    getServices
}