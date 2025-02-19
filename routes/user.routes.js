import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
   login,
   register,
   resetPassword,
   sendOTP,
   verifyOTP,
} from "../controllers/auth.controller.js";
import {
   findAll,
   findOne,
   getBySearch,
   remove,
   update,
} from "../controllers/user.controller.js";
import rolePolice from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/send-otp", sendOTP);
userRoute.post("/verify-otp", verifyOTP);
userRoute.post("/login", login);
userRoute.post("/reset-password", resetPassword);

userRoute.get("/search", verifyToken, getBySearch);
userRoute.get("/", findAll);
userRoute.get("/:id", verifyToken, selfPolice(["admin"]), findOne);
userRoute.delete("/:id", verifyToken, selfPolice(["admin"]), remove);
userRoute.patch("/:id", verifyToken, selfPolice(["admin"]), update);

export default userRoute;
