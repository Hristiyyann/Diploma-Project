const { differenceInDays } = require('../utils/helpers');
const { Sitter } = require('../utils/models');
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

module.exports = 
{
    postCandidates,
    getCandidates,
    checkCandidate
}