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
         FieldOrSubject() {
            if (!this.fieldId && !this.subjectId) {
               throw new Error("Subject yo fiend id bo'lishi kerak");
            }
         },
      },
   }
);

Field.hasMany(Major, { foreignKey: "fieldId" });
Major.belongsTo(Field, { foreignKey: "fieldId" });

Subject.hasMany(Major, { foreignKey: "subjectId" });
Major.belongsTo(Subject, { foreignKey: "subjectId" });

export default Major;
