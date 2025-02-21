import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

function verifyToken(req, res, next) {
   try {
      let header = req.header("Authorization");
      let [_, token] = header.split(" ");

      if (!token) {
         return res.status(401).send({ msg: "Empty token" });
      }

      let accessSecret = process.env.accessKey;
      let data = jwt.verify(token, accessSecret);

      req.user = data;

      next();
   } catch (error) {
      return res.status(401).send({ msg: "Invalid token" });
   }
}

export default verifyToken; 
