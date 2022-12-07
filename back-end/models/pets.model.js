const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Pet = sequelize.define('pets',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },   

    petName:
    {
        type: DataTypes.STRING,
    }
});

module.exports = Pet;