const { use } = require('express/lib/router');
const {differenceInDays} = require('../utils/helpers');
const {Sitter} = require('../utils/models');

async function postCandidates(req, res)
{
    const {aboutSitter, city, neighborhood} = req.body;
    const userId = req.userData.userId;

    const user = await Sitter.findOne(
    {
        where:
        {
            user_id: userId,
        }
    });

    if(!user)
    {
        await Sitter.create(
        {
            user_id: userId,
            about_sitter: aboutSitter,
            city,
            neighborhood
        });

        return res.status(201).send({success: true, message:"User is added to sitter candidates"});
    }

    if(user.status == 'Approved') return res.status(400).send({success: false, message:'You are already approved for being sitter'});
    else if(user.status == 'Candidate') return res.status(400).send({success: false, message:'You are candidate yet, please wait for admin respond'});

    const days = differenceInDays(user.updatedAt);
    if(days < 1) return res.status(400).send({success: false, message:'You have to wait ' + (5 - days) + ' for new candidate '});
    user.status = Sitter.rawAttributes.status.values[0];
    user.save();

    return res.status(200).send({success: true, message: "Okay user is again candidate"});
}

async function getCandidates(req, res)
{
    const candidates = await Sitter.findAll(
    {
        where: 
        {
            status: 'Candidate'
        }
    });

    res.status(200).send({success: true, candidates});
}

module.exports = 
{
    postCandidates,
    getCandidates
}