import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: "localhost",
   username: "root",
   password: "Kamronbek196769*",
   database: "fullstackexam",
   dialect: "mysql",
   logging: false,
   timezone: "+05:00"
});

export { sequelize };
