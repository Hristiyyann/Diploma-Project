const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const SitterService = sequelize.define('sitter_services',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    sitter_id: 
    {
        type: DataTypes.UUID,
    },

    service_id:
    {
        type: DataTypes.UUID,
    },

    price:
    {
        type: DataTypes.DECIMAL(5,2),
    }
});

module.exports = SitterService;