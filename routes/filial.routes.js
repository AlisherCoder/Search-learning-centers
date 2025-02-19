import { Router } from "express";
import {
   create,
   findAll,
   findOne,
   remove,
   update,
} from "../controllers/center.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const filialRoute = Router();

filialRoute.get("/", findAll);
filialRoute.post("/", verifyToken, create);
filialRoute.get("/:id", findOne);
filialRoute.delete("/:id", verifyToken, remove);
filialRoute.patch("/:id", verifyToken, update);

export default filialRoute;
