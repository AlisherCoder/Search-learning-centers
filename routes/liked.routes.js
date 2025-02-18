import { Router } from "express";
import { findAll, findBySorted, findOne, create, update ,remove} from "../controllers/likeds.controller.js";

const likedRouter = Router();

likedRouter.get("/", findAll);
likedRouter.get("/query", findBySorted);
likedRouter.get("/:id", findOne);
likedRouter.post("/", create);
likedRouter.patch("/:id", update);
likedRouter.delete("/:id", remove);

export default likedRouter