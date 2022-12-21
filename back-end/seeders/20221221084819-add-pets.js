const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = 
{
  async up (queryInterface, Sequelize) 
  {
    const pets = ['Small dog', 'Big dog', 'Cat', 'Parrot', 'Rabbit'];
    let petsForAdd = [];

    for (let i = 0; i < pets.length; i++)
    {
      petsForAdd = [...petsForAdd, 
      {
        id: uuidv4(),
        pet_name: pets[i],
        created_at: new Date(),
        updated_at: new Date()
      }]
    }
    await queryInterface.bulkInsert('Pets', petsForAdd, {});
  },

  async down (queryInterface, Sequelize) 
  {
    await queryInterface.bulkDelete('Pets', {});
  }
};
