'use strict';

module.exports = 
{
  async up(queryInterface, Sequelize) 
  {
    await queryInterface.createTable('time_ranges', 
    {
      id: 
      {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
      },

      associated_service:
      {
          type: Sequelize.UUID,
      },

      start_hour:
      {
          type: Sequelize.TIME
      },

      end_hour:
      {
          type: Sequelize.TIME
      },
      
      created_at: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: 
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) 
  {
    await queryInterface.dropTable('time_ranges');
  }
};