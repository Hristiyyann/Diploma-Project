const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');
const Review = require('./reviews.model');
const Booking = require('./bookings.model');
const SitterService = require('./sitter-services.model');
const Schedule = require('./schedules.model');
const SitterCriteria = require('./sitter-pet-criteria.model');

const Sitter = sequelize.define('sitters',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    userId: 
    {
        type: DataTypes.UUID,
        unique: true,
    },

    aboutSitter:
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
    },

    status:
    {
        type: DataTypes.ENUM('Candidate', 'Approved', 'Disapproved'),
        defaultValue: 'Candidate',
    }
});

Sitter.hasMany(Review, {foreignKey: 'sitterId'});
Sitter.hasMany(SitterService, {foreignKey: 'sitterId'});
Sitter.hasMany(Booking, {foreignKey: 'sitterId'});
Sitter.hasMany(Schedule,{foreignKey: 'sitterId'});
Sitter.hasMany(SitterCriteria, {foreignKey: 'sitterId'});
    
module.exports = Sitter;