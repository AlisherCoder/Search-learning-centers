import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
   host: "localhost",
   username: "root",
   password: "Abduhamid",
   database: "fullstackexam",
   dialect: "mysql",
   logging: false,
});

export { sequelize };
