const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const Sitter = sequelize.define('sitters',
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
        unique: true,
    },

    about_sitter:
    {
        type: DataTypes.TEXT,
    },

    city:
    {
        type: DataTypes.STRING,
    },

    neighborhood:
    {
        type: DataTypes.STRING,
    }
});

module.exports = Sitter;