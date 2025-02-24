import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db.js";
import mainRoute from "./routes/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

let PORT = process.env.PORT || 4000;
let app = express();
app.use(express.json());

const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "Exam-project",
         version: "0.1.0",
         description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
         {
            url: "http://3.37.19.181:4000/",
         },
      ],
      components: {
         securitySchemes: {
            bearerAuth: {
               type: "http",
               scheme: "bearer",
               bearerFormat: "JWT",
            },
         },
      },
      security: [
         {
            bearerAuth: [],
         },
      ],
   },
   apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(
   cors({
      origin: "*",
      methods: "GET,POST,PATCH,DELETE",
      allowedHeaders: "Content-Type,Authorization",
   })
);

app.use("/api", mainRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/*", (req, res) => {
   res.status(400).json({ message: "Not found route." });
});

async function bootstrapt() {
   try {
      await sequelize.authenticate();
      // await sequelize.sync({force: true});

      console.log("Db connected successfully ✅");
      app.listen(PORT, () => console.log("Server started on PORT", PORT));
   } catch (error) {
      console.log(error.message);
   }
}
bootstrapt();
