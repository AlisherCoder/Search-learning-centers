import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.model.js';
import Category from './category.model.js';

const Resource = sequelize.define('resources', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.hasMany(Resource, { foreignKey: 'userId' });
Resource.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Resource, { foreignKey: 'categoryId' });
Resource.belongsTo(Category, { foreignKey: 'categoryId' });

export default Resource;
