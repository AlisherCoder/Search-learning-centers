import { Router } from "express";
import userRoute from "./user.routes.js";
import upload from "../config/multer.js";
import centerRoute from "./center.routes.js";
import majorItemRoute from "./majorItem.routes.js";

const mainRoute = Router();

mainRoute.use("/users", userRoute);
mainRoute.use("/centers", centerRoute);
mainRoute.use("/majorItems", majorItemRoute);

mainRoute.use("/upload", upload.single("image"), (req, res) => {
   res.status(201).json({ data: req.file.filename });
});

export default mainRoute;
