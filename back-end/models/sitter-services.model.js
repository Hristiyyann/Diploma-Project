const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const SitterService = sequelize.define('sitter_services',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    sitterId: 
    {
        type: DataTypes.UUID,
    },

    serviceId:
    {
        type: DataTypes.UUID,
    },

    price:
    {
        type: DataTypes.DECIMAL(5,2),
    }
});

module.exports = SitterService;