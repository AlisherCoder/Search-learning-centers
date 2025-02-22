import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: "localhost",
   username: "root",
   password: "password",
   database: "fullstackexam",
   dialect: "mysql",
   timezone: "+05:00",
   logging: false,
});

export { sequelize };
