const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const BookingItem = sequelize.define('booking_items',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    bookingId: 
    {
        type: DataTypes.UUID,
    },

    serviceId:
    {
        type: DataTypes.UUID,
    },

    price:
    {
        type: DataTypes.DECIMAL(7,2),
    }
});

module.exports = BookingItem;