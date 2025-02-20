import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const accessKey = process.env.accessKey;
const refreshKey = process.env.refreshKey;

export function genAccessToken(payload) {
   const token = jwt.sign(payload, accessKey, { expiresIn: "12h" });
   return token;
}

export function genRefreshToken(payload) {
   const token = jwt.sign(payload, refreshKey, { expiresIn: "7d" });
   return token;
}
