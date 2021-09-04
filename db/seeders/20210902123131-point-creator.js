'use strict';
const randomLatitude = require('random-latitude');
const randomLongitude = require('random-longitude');
const faker = require('faker');
faker.locale = "ru";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Points', [{
      user: faker.company.companyName(),
      coordslat: randomLatitude(),
      coordslon: randomLongitude(),
      text: faker.company.companyName(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Points', null, {});
  }
};
