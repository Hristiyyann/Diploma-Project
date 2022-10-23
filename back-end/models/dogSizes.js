const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const SitterCriteria = require('./sitterDogCriteria');

const DogSize = sequelize.define('dog_sizes',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },   

    size_name:
    {
        type: DataTypes.STRING,
    },

    kilos_start:
    {
        type: DataTypes.INTEGER,
    },
    
    kilos_end:
    {
        type: DataTypes.INTEGER,
    }
});

DogSize.hasMany(SitterCriteria, {foreignKey: 'dog_size_id'});

module.exports = DogSize;