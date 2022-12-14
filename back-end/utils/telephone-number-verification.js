const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendOTP()
{
    const verification = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
                                               .verifications
                                               .create({to: process.env.TELEPHONE_NUMBER, channel: 'sms'});
}

async function checkOTP(code)
{
    const verificationCheck = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
                                          .verificationChecks
                                          .create({to: process.env.TELEPHONE_NUMBER, code});

    return verificationCheck.status == 'approved' ? true : false;
}

module.exports = 
{
    sendOTP, checkOTP
}