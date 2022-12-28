const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = 
{
  async up (queryInterface, Sequelize) 
  {
    const serviceId = '1beccf9e-4a59-422b-b5c3-394544b2ea58';
    const startHours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const endHours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    let timeRanges = [];

    for(let i = 0; i < startHours.length; i++) 
    {
      timeRanges = [...timeRanges, 
      { 
        id: uuidv4(),
        associated_service: serviceId,
        start_hour: startHours[i],
        end_hour: endHours[i],
        created_at: new Date(),
        updated_at: new Date()
      }]
    }
    await queryInterface.bulkInsert('Time_Ranges', timeRanges, {});
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.bulkDelete('Time_Ranges', {});
  }
};
