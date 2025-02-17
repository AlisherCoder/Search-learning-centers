import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js";

const Region = sequelize.define(
   "regions",
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   { timestamps: false }
);

export default Region;
