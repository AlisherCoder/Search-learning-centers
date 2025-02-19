import { Router } from "express";
import userRoute from "./user.routes.js";
import upload from "../config/multer.js";
import centerRoute from "./center.routes.js";
import majorItemRoute from "./majorItem.routes.js";
import filialRoute from "./filial.routes.js";

import fieldRouter from "./Field.routes.js";
import subjectRouter from "./subject.routes.js";
import mojorRouter from "./major.routes.js";
import reseptionRouter from "./resaption.routes.js";
import likedRouter from "./liked.routes.js";
import categoryRoute from "./category.routes.js";
import regionRoute from "./region.routes.js";
import resourceRoute from "./resource.routes.js";
import commentRoute from "./comment.routes.js";

const mainRoute = Router();

mainRoute.use("/users", userRoute);
mainRoute.use("/centers", centerRoute);
mainRoute.use("/filials", filialRoute)
mainRoute.use("/majorItems", majorItemRoute);

mainRoute.use("/upload", upload.single("image"), (req, res) => {
   res.status(201).json({ data: req.file.filename });
});
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
