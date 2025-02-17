import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Center from "./center.model.js";
import Region from "./region.model.js";

const Filial = sequelize.define("filials", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Region,
         key: "id",
      },
   },
   centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Center,
         key: "id",
      },
   },
   address: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

Region.hasMany(Filial, { foreignKey: "regionId" });
Filial.belongsTo(Region, { foreignKey: "regionId" });

Center.hasMany(Filial, { foreignKey: "centerId" });
Filial.belongsTo(Center, { foreignKey: "centerId" });

export default Filial;
