const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const Schedule = require('./schedules');
const SitterService = require('./sitterServices');
const BookingItem = require('./bookingItems');

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