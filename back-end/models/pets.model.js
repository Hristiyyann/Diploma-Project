const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');
const SitterCriteria = require('./sitter-pet-criteria.model');

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

Pet.hasMany(SitterCriteria, {foreignKey: 'petId'});

module.exports = Pet;