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

    service_name: 
    {
        type: DataTypes.STRING,
        unique: true,
    },
    
    service_type:
    {
        type: DataTypes.ENUM('Main', 'Additional'),
    }
});

Service.hasMany(SitterService, {foreignKey: 'service_id',});
Service.hasMany(BookingItem, {foreignKey: 'service_id'});
Service.hasMany(Schedule, {foreignKey: 'service_id'});

module.exports = Service;