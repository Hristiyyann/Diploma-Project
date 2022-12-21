'use strict';

module.exports = 
{
  async up (queryInterface, Sequelize) 
  {
    await queryInterface.removeColumn('Schedules', 'start_hour'),
    await queryInterface.removeColumn('Schedules', 'end_hour'),
    await queryInterface.addColumn('Schedules', 'time_range_id',
    {
      type: Sequelize.UUID,
      references: 
      {
        model: 'time_ranges', 
        key: 'id', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
    })
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.addColumn('Schedules', 'start_hour',
    {
      type: Sequelize.TIME,
    }),
    await queryInterface.addColumn('Schedules', 'end_hour',
    {
      type: Sequelize.TIME,
    }),
    await queryInterface.removeColumn('Schedules', 'time_range_id')
  }
};
