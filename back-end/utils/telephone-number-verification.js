const config = require('../utils/config');
const client = require('twilio')(config.accountSid, config.authToken);

async function sendOTP()
{
    const verification = await client.verify.v2.services(config.serviceId)
                                               .verifications
                                               .create({to: config.telephoneNumber, channel: 'sms'});
}

async function checkOTP(code)
{
    const verificationCheck = await client.verify.v2.services(config.serviceId)
                                          .verificationChecks
                                          .create({to: config.telephoneNumber, code});

    return verificationCheck.status == 'approved' ? true : false;
}

module.exports = 
{
    sendOTP,
    checkOTP
}