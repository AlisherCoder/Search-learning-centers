import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get("/", findAll);
categoryRoute.get("/search", findBySearch);
categoryRoute.get("/:id", findOne);
categoryRoute.post("/", create);
categoryRoute.patch("/:id", update);
categoryRoute.delete("/:id", remove);

export default categoryRoute;
