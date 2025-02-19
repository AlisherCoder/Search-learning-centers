import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db.js";
import mainRoute from "./routes/index.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

let PORT = process.env.PORT || 3000
let app = express();
app.use(express.json())

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
            url: "http://localhost:4000/",
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




// Status Code	Ma’nosi	Qachon ishlatiladi?
// 200	OK	Ma’lumot muvaffaqiyatli yangilandi va qaytarildi
// 204	No Content	Ma’lumot muvaffaqiyatli yangilandi, lekin javobda hech narsa yo‘q
// 400	Bad Request	Noto‘g‘ri yoki noto‘liq ma’lumot yuborilgan
// 401	Unauthorized	Foydalanuvchiga yangilash uchun ruxsat yo‘q
// 403	Forbidden	Yangilashga ruxsat berilmagan (masalan, boshqa foydalanuvchining ma’lumotlarini o‘zgartirishga urinish)
// 404	Not Found	Yangilanmoqchi bo‘lgan resurs topilmadi
// 409	Conflict	Ma’lumotlar to‘qnashuvi (masalan, allaqachon mavjud bo‘lgan qiymat bilan yangilashga urinish)
// 500	Internal Server Error	Server ichki xatolikka uchradi