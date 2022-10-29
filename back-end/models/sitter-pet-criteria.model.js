const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');

const SitterCriteria = sequelize.define('sitter_pet_criteria',
{
    id: 
    {
        type: DataTypes.UUID,
        primaryKey: true
    },

    sitter_id:
    {
        type: DataTypes.UUID
    },

    pet_id:
    {
        type: DataTypes.UUID
    }
});

module.exports = SitterCriteria;