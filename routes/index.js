import { Router } from "express";
import fieldRouter from "./Field.routes.js";
import subjectRouter from "./subject.routes.js";
import mojorRouter from "./mojor.routes.js";
import reseptionRouter from "./resaption.routes.js";
import likedRouter from "./liked.routes.js";


const mainRoute = Router();

mainRoute.use("/fields", fieldRouter);
mainRoute.use("/subject", subjectRouter);
mainRoute.use("/major", mojorRouter);
mainRoute.use("/reseption",reseptionRouter)
mainRoute.use("/liked",likedRouter)

export default mainRoute;
