const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const UserNotificationsToken = sequelize.define('user_notifications_tokens',
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

    token:
    {
        type: DataTypes.STRING,
    }
});

module.exports = UserNotificationsToken;