const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const User = sequelize.define('users',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    firstName:
    {
        type: DataTypes.STRING,
    },

    lastName:
    {
        type: DataTypes.STRING,
    },

    emailAddress:
    {
        type: DataTypes.STRING,
        unique: 'email_address',
    },

    password:
    {
        type: DataTypes.STRING,
    },

    telephoneNumber:
    {
        type: DataTypes.STRING,
        unique: 'telephone_number'
    },

    isVerified:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    isBloked:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = User;