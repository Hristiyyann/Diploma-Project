const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const Review = require('./reviews');
const Booking = require('./bookings');
const SitterService = require('./sitterServices');
const Schedule = require('./schedules');
const SitterCriteria = require('./sitterDogCriteria');

const Sitter = sequelize.define('sitters',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    user_id: 
    {
        type: DataTypes.UUID,
        unique: true,
    },

    about_sitter:
    {
        type: DataTypes.TEXT,
    },

    city:
    {
        type: DataTypes.STRING,
    },

    neighborhood:
    {
        type: DataTypes.STRING,
    }
});

Sitter.hasMany(Review, {foreignKey: 'sitter_id'});
Sitter.hasMany(SitterService, {foreignKey: 'sitter_id'});
Sitter.hasMany(Booking, {foreignKey: 'sitter_id'});
Sitter.hasMany(Schedule,{foreignKey: 'sitter_id'});
Sitter.hasMany(SitterCriteria, {foreignKey: 'sitter_id'});
    
module.exports = Sitter;