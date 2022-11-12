const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');
const Schedule = require('./schedules.model');
const SitterService = require('./sitter-services.model');
const BookingItem = require('./booking-items.model');

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

Service.hasMany(SitterService, {foreignKey: 'serviceId',});
Service.hasMany(BookingItem, {foreignKey: 'serviceId'});
Service.hasMany(Schedule, {foreignKey: 'serviceId'});

module.exports = Service;