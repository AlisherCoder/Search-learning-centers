import { Router } from "express";
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from "../controllers/comment.controller.js";

const commentRoute = Router();

commentRoute.get("/", findAll);
commentRoute.get("/:id", findOne);
commentRoute.post("/", create);
commentRoute.patch("/:id", update);
commentRoute.delete("/:id", remove);

export default commentRoute;
