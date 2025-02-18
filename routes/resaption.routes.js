import {Router} from "express"
import { create, findAll, findBySorted, findOne, remove, update } from "../controllers/reception.controller.js"


const reseptionRouter = Router()

reseptionRouter.get("/", findAll);
reseptionRouter.get("/query", findBySorted);
reseptionRouter.get("/:id", findOne);
reseptionRouter.post("/", create);
reseptionRouter.patch("/:id", update);
reseptionRouter.delete("/:id", remove);

export default reseptionRouter