import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.model.js";
import Filial from "./filial.model.js";
import Major from "./major.model.js";

const Reception = sequelize.define("receptions", {
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
         key: "id",
      },
   },
   filialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
         model: Filial,
         key: "id",
      },
   },
   majorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Major,
         key: "id",
      },
      unique: true,
   },
   visitDate: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   status: {
      type: DataTypes.ENUM("visit", "pending", "not visit"),
      allowNull: true,
      defaultValue: "pending",
   },
});

User.hasMany(Reception, { foreignKey: "userId" });
Reception.belongsTo(User, { foreignKey: "userId" });

Filial.hasMany(Reception, { foreignKey: "filialId" });
Reception.belongsTo(Filial, { foreignKey: "filialId" });

Major.hasMany(Reception, { foreignKey: "majorId" });
Reception.belongsTo(Major, { foreignKey: "majorId" });

export default Reception;
