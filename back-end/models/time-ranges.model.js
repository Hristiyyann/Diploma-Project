const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const TimeRange = sequelize.define('time_ranges',
{
    id: 
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    associatedService:
    {
        type: DataTypes.UUID,
    },

    startHour:
    {
        type: DataTypes.UUID
    },

    endHour:
    {
        type: DataTypes.UUID
    }
});

module.exports = TimeRange;