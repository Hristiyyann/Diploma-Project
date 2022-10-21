const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const SitterCriteria = sequelize.define('sitter_dog_criteria',{
    id: 
    {
        type: DataTypes.UUID,
        primaryKey: true
    },

    sitter_id:
    {
        type: DataTypes.UUID
    },

    dog_size_id:
    {
        type: DataTypes.UUID
    }
});

module.exports = SitterCriteria;