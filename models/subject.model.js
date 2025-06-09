import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

const Subject = sequelize.define(
  'subjects',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false },
);

export default Subject;
