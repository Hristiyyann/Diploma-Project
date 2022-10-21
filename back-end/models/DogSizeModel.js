const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');

const DogSize = sequelize.define('dog_sizes',{
    id:
    {
        type: DataTypes.UUID,
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

module.exports = DogSize;