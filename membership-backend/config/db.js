// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('membership', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// sequelize.authenticate()
//   .then(() => console.log('MySQL connected'))
//   .catch(err => console.error('MySQL connection error:', err));

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('membership', 'Admin', 'Gibril+2002', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('MySQL connection error:', err));

module.exports = sequelize;
