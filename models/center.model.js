import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Region from "./region.model.js";
import User from "./user.model.js";

const Center = sequelize.define("centers", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   name: {
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
   address: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   seoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: User,
         key: "id",
      },
   },
   image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

Region.hasMany(Center, { foreignKey: "regionId" });
Center.belongsTo(Region, { foreignKey: "regionId" });

User.hasMany(Center, { foreignKey: "seoId" });
Center.belongsTo(User, { foreignKey: "seoId" });

export default Center;
