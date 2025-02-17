import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Field from "./field.model.js";
import Subject from "./subject.model.js";

const Major = sequelize.define(
   "majors",
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
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      fieldId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: Field,
            key: "id",
         },
      },
      subjectId: {
         type: DataTypes.INTEGER,
         allowNull: true,
         references: {
            model: Subject,
            key: "id",
         },
      },
   },
   {
      timestamps: false,
      validate: {
         eitherFieldOrSubject() {
            if (!this.fieldId && !this.subjectId) {
               throw new Error("Either fieldId or subjectId must be provided.");
            }
         },
      },
   }
);

Field.hasMany(Major, { foreignKey: "typeId" });
Major.belongsTo(Field, { foreignKey: "typeId" });

Subject.hasMany(Major, { foreignKey: "typeId" });
Major.belongsTo(Subject, { foreignKey: "typeId" });

export default Major;
