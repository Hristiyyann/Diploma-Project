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
    },

    status:
    {
        type: DataTypes.ENUM('Candidate', 'Approved', 'Disapproved'),
        defaultValue: 'Candidate',
    }
});

Sitter.hasMany(Review, {foreignKey: 'sitter_id'});
Sitter.hasMany(SitterService, {foreignKey: 'sitter_id'});
Sitter.hasMany(Booking, {foreignKey: 'sitter_id'});
Sitter.hasMany(Schedule,{foreignKey: 'sitter_id'});
Sitter.hasMany(SitterCriteria, {foreignKey: 'sitter_id'});
    
module.exports = Sitter;