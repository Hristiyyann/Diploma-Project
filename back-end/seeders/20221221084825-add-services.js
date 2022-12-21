const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = 
{
  
  
  async up (queryInterface, Sequelize) 
  {
    const mainServices = ['Dog walking', 'Drop-in visit'];
    const additionalServices = ['Watering flowers', 'Full bath', 'Mail collection', 'Shipment reception', 'Single combing'];
    let allServices = [];

    for(let i = 0; i < mainServices.length; i++)
    {
      allServices = [...allServices, 
      {
        id: uuidv4(),
        service_name: mainServices[i],
        service_type: 'Main',
        created_at: new Date(),
        updated_at: new Date()
      }]
    }

    for(let i = 0; i < additionalServices.length; i++)
    {
      allServices = [...allServices, 
      {
        id: uuidv4(),
        service_name: additionalServices[i],
        service_type: 'Additional',
        created_at: new Date(),
        updated_at: new Date()
      }]
    }
    await queryInterface.bulkInsert('Services', allServices, {});
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.bulkDelete('Services', {});
  }
};
