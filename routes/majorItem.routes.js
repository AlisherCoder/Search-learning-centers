import { Router } from "express";
import { create, remove } from "../controllers/majorItem.controller.js";

const majorItemRoute = Router();

majorItemRoute.post("/", create);
majorItemRoute.delete("/", remove);

export default majorItemRoute;
