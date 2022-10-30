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

    pet_name:
    {
        type: DataTypes.STRING,
    }
});

Pet.hasMany(SitterCriteria, {foreignKey: 'pet_id'});

module.exports = Pet;