import { Router } from "express";
import fieldRouter from "./Field.routes.js";
import subjectRouter from "./subject.routes.js";
import mojorRouter from "./mojor.routes.js";

const mainRoute = Router();

mainRoute.use("/fields", fieldRouter);
mainRoute.use("/subject", subjectRouter);
mainRoute.use("/mojor", mojorRouter);

export default mainRoute;
