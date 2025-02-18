import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/region.controller.js";

const regionRoute = Router();

regionRoute.get("/", findAll);
regionRoute.get("/search", findBySearch);
regionRoute.get("/:id", findOne);
regionRoute.post("/", create);
regionRoute.patch("/:id", update);
regionRoute.delete("/:id", remove);

export default regionRoute;
