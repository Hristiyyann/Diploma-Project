const { differenceInDays } = require('../utils/helpers');
const { Sitter, Service, SitterService } = require('../utils/models');
const { ValidationError, ResourceError } = require('../utils/errors');
const messages = require('../utils/thrown-error-messages');

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

async function getServices(req, res)
{
    const userId = req.params.user || req.userData.userId;
    const sitter = await Sitter.findOne({where: {userId}});

    const services = await Service.findAll(
    { 
        attributes:
        {
            exclude:['createdAt', 'updatedAt']
        },
        
        include: 
        {
            model: SitterService, 
            where: { sitterId: sitter.id },
            required: false,
            attributes:
            {
                exclude:['sitterId', 'createdAt', 'updatedAt']
            },
        },
    }); 

    res.status(200).send(services); 
}

async function postServices(req, res)
{
    const { data } = req.body;
    const userId = req.userData.userId;

    const sitter = await Sitter.findOne({where: {userId}});

    for(const serviceId in data) 
    {
        const service = await SitterService.findOne({where: 
        {
            serviceId,
            sitterId: sitter.id,
        }});

        if(service && data[serviceId].isEnabled == false)
        {
            await SitterService.destroy({where: {id: service.id}});
        }
        else if(!service && data[serviceId].isEnabled == true)
        {
            await SitterService.create(
            {
                sitterId: sitter.id,
                serviceId: serviceId,
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

module.exports = 
{
    postCandidates, getCandidates, checkCandidate, getServices, postServices, 

}