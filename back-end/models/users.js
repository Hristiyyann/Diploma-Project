const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const UserNotificationsToken = require('./userNotificationsToken');
const UserRole = require('./userRoles');
const UserToken = require('./userToken');
const SmsCode = require('./smsCodes');
const Sitter = require('./sitters');
const Review = require('./reviews');
const Booking = require('./bookings');

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
        unique: true,
    },

    password:
    {
        type: DataTypes.STRING,
    },

    telephone_number:
    {
        type: DataTypes.STRING,
        unique: true
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
User.hasMany(SmsCode, {foreignKey: 'user_id'});
User.hasMany(Review, {foreignKey: 'booker_id'});
User.hasMany(Booking, {foreignKey: 'booker_id'});

module.exports = User;