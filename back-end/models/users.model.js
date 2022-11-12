const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');
const UserNotificationsToken = require('./user-notifications-token.model');
const UserRole = require('./user-roles.model');
const UserToken = require('./user-tokens.model');
const Sitter = require('./sitters.model');
const Review = require('./reviews.model');
const Booking = require('./bookings.model');

const User = sequelize.define('users',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    firstName:
    {
        type: DataTypes.STRING,
    },

    lastName:
    {
        type: DataTypes.STRING,
    },

    emailAddress:
    {
        type: DataTypes.STRING,
        unique: 'email_address',
    },

    password:
    {
        type: DataTypes.STRING,
    },

    telephoneNumber:
    {
        type: DataTypes.STRING,
        unique: 'telephone_number'
    },

    isVerified:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    isBloked:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

User.hasOne(Sitter, {foreignKey: 'userId'});    
User.hasMany(UserNotificationsToken, {foreignKey: 'userId'});
User.hasMany(UserRole, {foreignKey: 'userId'});
User.hasMany(UserToken, {foreignKey: 'userId'});
User.hasMany(Review, {foreignKey: 'bookerId'});
User.hasMany(Booking, {foreignKey: 'bookerId'});

module.exports = User;