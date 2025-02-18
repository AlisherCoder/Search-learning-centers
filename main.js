import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db.js";
import mainRoute from "./routes/index.js";
dotenv.config();

let port = process.env.PORT || 3000
let app = express();

app.use(express.json());
app.use(
   cors({
      origin: "*",
   })
);
app.use("/api", mainRoute);

async function bootstrapt() {
   try {
      await sequelize.authenticate();
      // await sequelize.sync({force: true});

      console.log("Db connected successfully ✅");
      app.listen(port, () => console.log("Server started on port", port));
   } catch (error) {
      console.log(error.message);
   }
}
bootstrapt();
