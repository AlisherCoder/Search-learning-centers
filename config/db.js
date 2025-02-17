import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: "localhost",
   username: "root",
   password: "95490",
   database: "fullstackexam",
   dialect: "mysql",
   logging: false,
});

export { sequelize };
