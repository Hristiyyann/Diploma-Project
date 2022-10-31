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

    first_name:
    {
        type: DataTypes.STRING,
    },

    last_name:
    {
        type: DataTypes.STRING,
    },

    email_address:
    {
        type: DataTypes.STRING,
        unique: 'email_address',
    },

    password:
    {
        type: DataTypes.STRING,
    },

    telephone_number:
    {
        type: DataTypes.STRING,
        unique: 'telephone_number'
    },

    is_candidate:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    is_verified:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    is_bloked:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

User.hasOne(Sitter, {foreignKey: 'user_id'});    
User.hasMany(UserNotificationsToken, {foreignKey: 'user_id'});
User.hasMany(UserRole, {foreignKey: 'user_id'});
User.hasMany(UserToken, {foreignKey: 'user_id'});
User.hasMany(Review, {foreignKey: 'booker_id'});
User.hasMany(Booking, {foreignKey: 'booker_id'});

module.exports = User;