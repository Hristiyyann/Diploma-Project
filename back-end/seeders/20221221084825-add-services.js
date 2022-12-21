const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = 
{
  async up (queryInterface, Sequelize) 
  {
    await queryInterface.bulkInsert('Services', [
    {
      id: uuidv4(),
      service_name: 'Dog walking',
      service_type: 'Main',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Drop-in visit',
      service_type: 'Main',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Watering flowers',
      service_type: 'Additional',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Full bath',
      service_type: 'Additional',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Mail collection',
      service_type: 'Additional',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Shipment reception',
      service_type: 'Additional',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      service_name: 'Single combing',
      service_type: 'Additional',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.bulkDelete('Services', {});
  }
};
