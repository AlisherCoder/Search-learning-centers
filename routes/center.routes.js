import { Router } from "express";
import {
   create,
   findAll,
   findOne,
   remove,
   update,
} from "../controllers/center.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const centerRoute = Router();

centerRoute.get("/", findAll);
centerRoute.post("/", verifyToken, create);
centerRoute.get("/:id", findOne);
centerRoute.delete("/:id", verifyToken, remove);
centerRoute.patch("/:id", verifyToken, update);

export default centerRoute;
