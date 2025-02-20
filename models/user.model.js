import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("users", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   firstName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   lastName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   role: {
      type: DataTypes.ENUM("user", "seo", "admin"),
      allowNull: false,
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
   },
});

export default User;
