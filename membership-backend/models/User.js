// // const mongoose = require('mongoose');

// // const UserSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   address: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   membership_expiry_date: { type: Date, required: true },
// //   created_at: { type: Date, default: Date.now },
// //   updated_at: { type: Date, default: Date.now },
// // });

// // module.exports = mongoose.model('User', UserSchema);

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   mobile_phone: {  
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   membership_expiry_date: {
//     type: DataTypes.DATE,
//     allowNull: false
//   }
// }, {
//   timestamps: true
// });

// module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SubscriptionPlan = require('./SubscriptionPlan');

const User = sequelize.define('User', {
  
first_name: {
  type: DataTypes.STRING,
  allowNull: false,
},
last_name: {
  type: DataTypes.STRING,
  allowNull: false,
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
},
password: {
  type: DataTypes.STRING,
  allowNull: false,
},
mobile_phone: {
  type: DataTypes.STRING,
  allowNull: false,
},
address: {
  type: DataTypes.STRING,
  allowNull: false,
},
subscription_plan_id: {
  type: DataTypes.INTEGER,
  references: {
    model: SubscriptionPlan,
    key: 'plan_id',
    defaultValue: null
  },
},
subscription_status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'NOT PAID',
},
membership_expiry_date: {
  type: DataTypes.DATE,
  allowNull: true,
},
}, {
tableName: 'users',
});

User.belongsTo(SubscriptionPlan, { foreignKey: 'subscription_plan_id' });

module.exports = User;