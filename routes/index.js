import { Router } from "express";
import categoryRoute from "./category.routes.js";
import regionRoute from "./region.routes.js";

const mainRoute = Router();

mainRoute.use("/categories", categoryRoute);
mainRoute.use("/regions", regionRoute);

export default mainRoute;
