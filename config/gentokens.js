import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const accessKey = process.env.accessKey;
const refreshKey = process.env.refreshKey;

export function genAccessToken(payload) {
   const token = jwt.sign(payload, accessKey, { expiresIn: "1h" });
   return token;
}

export function genRefreshToken(payload) {
   const token = jwt.sign(payload, refreshKey, { expiresIn: "7d" });
   return token;
}

export function getAccessToken(req, res) {
   try {
      let { refreshToken } = req.body;

      if (!refreshToken) {
         return res.status(401).json({ message: "Not found refresh token." });
      }

      let data = jwt.verify(refreshToken, refreshKey);

      let accessToken = genAccessToken({
         id: data.id,
         role: data.role,
      });

      res.status(200).json({ accessToken });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}
