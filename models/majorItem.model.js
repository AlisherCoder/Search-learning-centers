import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Major from "./major.model.js";
import Center from "./center.model.js";

const MajorItem = sequelize.define("majoritems", {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   majorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Major,
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
});

Center.belongsToMany(Major, {
   through: MajorItem,
   foreignKey: "centerId",
   otherKey: "majorId",
});

Major.belongsToMany(Center, {
   through: MajorItem,
   foreignKey: "majorId",
   otherKey: "centerId",
});

export default MajorItem;
