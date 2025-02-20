import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Field = sequelize.define(
   "fields",
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
         allowNull: false,
      },
   },
   { timestamps: false }
);

export default Field;
