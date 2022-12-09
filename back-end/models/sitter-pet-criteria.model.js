const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const SitterCriteria = sequelize.define('sitter_pet_criteria',
{
    id: 
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    sitterId:
    {
        type: DataTypes.UUID
    },

    petId:
    {
        type: DataTypes.UUID
    }
});

module.exports = SitterCriteria;