import {Router} from "express"
import { create, findAll, findBySorted, findOne, remove, update } from "../controllers/subject.controller.js";


const subjectRouter = Router()

subjectRouter.get("/", findAll);
subjectRouter.get("/query", findBySorted);
subjectRouter.get("/:id", findOne);
subjectRouter.post("/", create);
subjectRouter.patch("/:id", update);
subjectRouter.delete("/:id", remove);

export default subjectRouter