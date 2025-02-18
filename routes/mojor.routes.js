import { Router } from "express";
import { findAll, findBySorted, findOne, create, update ,remove} from "../controllers/mojor.controller.js";

const mojorRouter = Router();

mojorRouter.get("/", findAll);
mojorRouter.get("/query", findBySorted);
mojorRouter.get("/:id", findOne);
mojorRouter.post("/", create);
mojorRouter.patch("/:id", update);
mojorRouter.delete("/:id", remove);

export default mojorRouter