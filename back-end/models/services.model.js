const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Service = sequelize.define('services',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    serviceName: 
    {
        type: DataTypes.STRING,
        unique: true,
    },
    
    serviceType:
    {
        type: DataTypes.ENUM('Main', 'Additional'),
    }
});

module.exports = Service;