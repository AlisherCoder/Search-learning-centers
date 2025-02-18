import {Router} from "express"
import { create, findAll, findBySorted, findOne, remove, update } from "../controllers/field.controller.js"


const fieldRouter = Router()

fieldRouter.get("/", findAll);
fieldRouter.get("/query", findBySorted);
fieldRouter.get("/:id", findOne);
fieldRouter.post("/", create);
fieldRouter.patch("/:id", update);
fieldRouter.delete("/:id", remove);

export default fieldRouter