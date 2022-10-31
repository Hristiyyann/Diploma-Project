const {UserToken} = require('./models');

async function addTokenToDB(userId, token) 
{
    try
    {
        const addToken = await UserToken.create(
        {
            user_id: userId,
            token: token
        });
    }
    catch (err)
    {
        console.log(err);
    }
}

module.exports = 
{
    addTokenToDB
}