const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.development);

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'manager', 'staff'), allowNull: false }
});

const Product = sequelize.define('Product', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  inventoryCount: { type: DataTypes.INTEGER, allowNull: false }
});

User.sync();
Product.sync();

module.exports = { User, Product, sequelize };
