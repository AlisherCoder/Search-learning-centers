import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.model.js';
import Filial from './filial.model.js';
import Major from './major.model.js';
import Center from './center.model.js';

const Reception = sequelize.define('receptions', {
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
  centerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Center,
      key: 'id',
    },
  },
  filialId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Filial,
      key: 'id',
    },
  },
  majorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Major,
      key: 'id',
    },
  },
  visitDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('VISIT', 'PENDING', 'NOT VISIT'),
    allowNull: true,
    defaultValue: 'PENDING',
  },
});

User.hasMany(Reception, { foreignKey: 'userId' });
Reception.belongsTo(User, { foreignKey: 'userId' });

Filial.hasMany(Reception, { foreignKey: 'filialId' });
Reception.belongsTo(Filial, { foreignKey: 'filialId' });

Center.hasMany(Reception, { foreignKey: 'centerId' });
Reception.belongsTo(Center, { foreignKey: 'centerId' });

Major.hasMany(Reception, { foreignKey: 'majorId' });
Reception.belongsTo(Major, { foreignKey: 'majorId' });

export default Reception;
