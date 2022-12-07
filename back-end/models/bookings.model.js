const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Booking = sequelize.define('bookings',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    bookerId:
    {
        type: DataTypes.UUID,
    },

    sitterId:
    {
        type: DataTypes.UUID,
    },

    transactionSecretKey:
    {
        type: DataTypes.STRING,
    },

    transactionStatus:
    {
        type: DataTypes.ENUM('Pending', 'Declined', 'Paid'),
    }
});

module.exports = Booking;