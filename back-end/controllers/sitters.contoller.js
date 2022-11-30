const { differenceInDays } = require('../utils/helpers');
const { Sitter } = require('../utils/models');
const messages = require('../utils/thrown-error-messages');

async function postCandidates(req, res)
{
    const { aboutSitter, city, neighborhood } = req.body;
    const userId = req.userData.userId;

    const user = await Sitter.findOne(
    {
        where:
        {
            userId,
        }
    });

    if(!user)
    {
        await Sitter.create(
        {
            userId, aboutSitter,
            city, neighborhood
        });

        return res.status(201).send({ success: true, message: messages.candidateUser });
    }

    if(user.status == 'Approved') return res.status(400).send({ success: false, message: messages.approvedUser });
    else if(user.status == 'Candidate') return res.status(400).send({ success: false, message: messages.stillCandidateUser });

    const days = differenceInDays(user.updatedAt);
    if(days < 1) return res.status(400).send({ success: false, message:'You have to wait ' + (5 - days) + ' for new candidate '});
    user.status = Sitter.rawAttributes.status.values[0];
    user.save();

    return res.status(200).send({ success: true, message: messages.againCandidateUser });
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
    getCandidates
}