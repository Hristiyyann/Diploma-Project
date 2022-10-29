const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');
const SitterCriteria = require('./sitter-pet-criteria.model');

const Pets = sequelize.define('pets',
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

Pets.hasMany(SitterCriteria, {foreignKey: 'pet_id'});

module.exports = Pets;