const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const UserToken = sequelize.define('user_tokens',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    userId: 
    {
        type: DataTypes.UUID,
    },

    token:
    {
        type: DataTypes.STRING,
    },

    tokenType:
    {
        type: DataTypes.ENUM('Refresh', 'Notification'),
    }
});

module.exports = UserToken;