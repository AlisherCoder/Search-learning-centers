import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
   try {
      let header = req.header("Authorization");
      let [_, token] = header.split(" ");

      if (!token) {
         return res.status(401).send({ msg: "Empty token" });
      }

      let accessSecret = process.env.accessKey || "access-secret";
      console.log(accessSecret);
      let result = jwt.decode(token, accessSecret);

      req.user = result;

      next();
   } catch (error) {
      return res.status(401).send({ msg: "Invalid token" });
   }
}

export default verifyToken;
