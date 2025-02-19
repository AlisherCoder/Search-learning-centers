import { Router } from "express";
import {
   create,
   findAll,
   findOne,
   remove,
   update,
} from "../controllers/filial.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const filialRoute = Router();

filialRoute.get("/", findAll);
filialRoute.post("/", verifyToken, rolePolice(["admin", "seo"]), create);
filialRoute.get("/:id", findOne);
filialRoute.delete("/:id", verifyToken, rolePolice(["admin", "seo"]), remove);
filialRoute.patch("/:id", verifyToken, rolePolice(["admin", "seo"]), update);

export default filialRoute;
