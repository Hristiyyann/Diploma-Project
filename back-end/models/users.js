const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const User = sequelize.define('users',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    first_name:
    {
        type: DataTypes.STRING,
    },

    last_name:
    {
        type: DataTypes.STRING,
    },

    email_address:
    {
        type: DataTypes.STRING,
        unique: true,
    },

    password:
    {
        type: DataTypes.STRING,
    },

    telephone_number:
    {
        type: DataTypes.STRING,
        unique: true
    },

    is_candidate:
    {
        type: DataTypes.BOOLEAN,
    },

    is_verified:
    {
        type: DataTypes.BOOLEAN,
    },

    is_bloked:
    {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = User;