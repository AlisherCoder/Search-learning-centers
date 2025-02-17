import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.model.js";
import Filial from "./filial.model.js";

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
      allowNull: false,
      references: {
         model: Filial,
         key: "id",
      },
   },
   status: {
      type: DataTypes.ENUM("pending", "study", "finished"),
      allowNull: false,
   },
});

User.hasMany(Reception, { foreignKey: "userId" });
Reception.belongsTo(User, { foreignKey: "userId" });

Filial.hasMany(Reception, { foreignKey: "filialId" });
Reception.belongsTo(Filial, { foreignKey: "filialId" });

export default Reception;
