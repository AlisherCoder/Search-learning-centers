import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/resource.controller.js";

const resourceRoute = Router();

resourceRoute.get("/", findAll);
resourceRoute.get("/search", findBySearch);
resourceRoute.get("/:id", findOne);
resourceRoute.post("/", create);
resourceRoute.patch("/:id", update);
resourceRoute.delete("/:id", remove);

export default resourceRoute;
