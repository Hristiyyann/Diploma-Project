const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const SmsCode = sequelize.define('sms_codes',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    user_id: 
    {
        type: DataTypes.UUID,
    },

    code:
    {
        type: DataTypes.STRING,
    },

    expires_in:
    {
        type: DataTypes.DATE,
    }
});

module.exports = SmsCode;