import { Router } from "express";

import fieldRouter from "./Field.routes.js";
import subjectRouter from "./subject.routes.js";
import mojorRouter from "./mojor.routes.js";
import reseptionRouter from "./resaption.routes.js";
import likedRouter from "./liked.routes.js";
import categoryRoute from "./category.routes.js";
import regionRoute from "./region.routes.js";
import resourceRoute from "./resource.routes.js";
import commentRoute from "./comment.routes.js";

const mainRoute = Router();

mainRoute.use("/fields", fieldRouter);
mainRoute.use("/subject", subjectRouter);
mainRoute.use("/major", mojorRouter);
mainRoute.use("/reseption",reseptionRouter)
mainRoute.use("/liked",likedRouter)
mainRoute.use("/categories", categoryRoute);
mainRoute.use("/regions", regionRoute);
mainRoute.use("/resources", resourceRoute);
mainRoute.use("/comments", commentRoute);


export default mainRoute;
