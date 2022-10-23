const {DataTypes} = require('sequelize');
const sequelize = require('../utils/databaseConnection');

const Schedule = sequelize.define('schedules',
{
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    sitter_id:
    {
        type: DataTypes.UUID,
    },

    service_id:
    {
        type: DataTypes.UUID,
    },

    date:
    {
        type: DataTypes.DATEONLY,
    },

    start_hour:
    {
        type: DataTypes.TIME,
    },

    end_hour:
    {
        type: DataTypes.TIME,
    }
});

module.exports = Schedule;