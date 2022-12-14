const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database-connection');

const Schedule = sequelize.define('schedules',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    sitterId:
    {
        type: DataTypes.UUID,
    },

    serviceId:
    {
        type: DataTypes.UUID,
    },

    timeRangeId:
    {
        type: DataTypes.UUID,
    },

    date:
    {
        type: DataTypes.DATEONLY,
    }
});

module.exports = Schedule;