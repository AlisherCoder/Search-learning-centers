import { Router } from "express";
import {
   create,
   findAll,
   findOne,
   remove,
   update,
} from "../controllers/center.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const centerRoute = Router();

centerRoute.get("/", findAll);
centerRoute.post("/", verifyToken, rolePolice(["admin", "seo"]), create);
centerRoute.get("/:id", findOne);
centerRoute.delete("/:id", verifyToken, rolePolice(["admin", "seo"]), remove);
centerRoute.patch("/:id", verifyToken, rolePolice(["admin", "seo"]), update);

export default centerRoute;
