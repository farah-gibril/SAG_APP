const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
  plan_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  plan_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plan_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'subscription_plan',
  timestamps: false,
});

module.exports = SubscriptionPlan;
