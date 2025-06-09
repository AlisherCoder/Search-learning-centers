import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.model.js';
import Center from './center.model.js';

const Comment = sequelize.define('comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  star: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  centerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Center,
      key: 'id',
    },
  },
});

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Center.hasMany(Comment, { foreignKey: 'centerId' });
Comment.belongsTo(Center, { foreignKey: 'centerId' });

export default Comment;
