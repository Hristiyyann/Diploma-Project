const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database-connection');

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
        type: DataTypes.DECIMAL(7,2),
    }
});

module.exports = BookingItem;