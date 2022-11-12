const {DataTypes} = require('sequelize');
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

    date:
    {
        type: DataTypes.DATEONLY,
    },

    startHour:
    {
        type: DataTypes.TIME,
    },

    endHour:
    {
        type: DataTypes.TIME,
    }
});

module.exports = Schedule;