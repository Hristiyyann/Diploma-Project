const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const BookingItem = sequelize.define('booking_items',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    booking_id: 
    {
        type: DataTypes.UUID,
    },

    service_id:
    {
        type: DataTypes.UUID,
    },

    price:
    {
        type: DataTypes.DECIMAL,
    }
});

module.exports = BookingItem;