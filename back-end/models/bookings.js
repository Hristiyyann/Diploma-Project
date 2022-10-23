const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');
const BookingItem = require('./bookingItems');

const Booking = sequelize.define('bookings',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    booker_id:
    {
        type: DataTypes.UUID,
    },

    sitter_id:
    {
        type: DataTypes.UUID,
    },

    transaction_secret_key:
    {
        type: DataTypes.STRING,
    },

    transaction_status:
    {
        type: DataTypes.ENUM('Pending', 'Declined', 'Paid'),
    }
});

Booking.hasMany(BookingItem, {foreignKey: 'booking_id'});

module.exports = Booking;