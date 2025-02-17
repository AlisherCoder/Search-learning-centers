import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";

const Like = sequelize.define("likes", {
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
   centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: Center,
         key: "id",
      },
   },
});

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

Center.hasMany(Like, { foreignKey: "centerId" });
Like.belongsTo(Center, { foreignKey: "centerId" });

export default Like;
