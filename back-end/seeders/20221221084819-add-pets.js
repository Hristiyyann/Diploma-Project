const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = 
{
  async up (queryInterface, Sequelize) 
  {
    await queryInterface.bulkInsert('Pets', [
    {
      id: uuidv4(),
      pet_name: 'Small dog',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      pet_name: 'Big dog',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      pet_name: 'Cat',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      pet_name: 'Parrot',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      pet_name: 'Rabbit',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.bulkDelete('Pets', {});
  }
};
