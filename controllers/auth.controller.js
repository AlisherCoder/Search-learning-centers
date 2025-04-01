import { passwordValid, userRegValid, createAdminValid } from "../validations/user.valid.js";
import { genAccessToken, genRefreshToken } from "../config/gentokens.js";
import sendMail from "../config/sendmail.js";
import User from "../models/user.model.js";
import { totp } from "otplib";
import bcrypt from "bcrypt";

export async function register(req, res) {
   try {
      let { error, value } = userRegValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { email, password } = value;

      let foundemail = await User.findOne({ where: { email } });
      if (foundemail) {
         return res.status(409).json({ message: "This email address already exists." });
      }

      let foundphone = await User.findOne({ where: { email } });
      if (foundphone) {
         return res.status(409).json({ message: "This phone number already exists." });
      }

      let hashpass = bcrypt.hashSync(password, 10);
      value.password = hashpass;

      let created = await User.create(value);
      await sendMail(email);

      res.status(201).json({
         message: "Registered, we have sent you a one-time password by email to activate your account.",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function login(req, res) {
   try {
      let { email, password } = req.body;

      let founduser = await User.findOne({ where: { email } });
      if (!founduser) {
         return res.status(401).json({ message: "Not found user." });
      }

      if (!founduser.isActive) {
         return res.status(401).json({ message: "Your account is not active." });
      }

      let isValid = bcrypt.compareSync(password, founduser.password);
      if (!isValid) {
         return res.status(401).json({ message: "Password or email is wrong." });
      }

      let accessToken = genAccessToken({
         id: founduser.id,
         role: founduser.role,
      });

      let refreshToken = genRefreshToken({
         id: founduser.id,
         role: founduser.role,
      });

      res.status(200).json({ accessToken, refreshToken });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function verifyOTP(req, res) {
   try {
      const sekretKey = process.env.OTPKEY || "otpsecret";

      let { email, otp } = req.body;
      let isValid = totp.check(otp, sekretKey + email);

      if (!isValid) {
         return res.status(401).json({ message: "OTP or email is wrong." });
      }

      let founduser = await User.findOne({ where: { email } });
      if (!founduser) {
         return res.status(401).json({ message: "Not found user." });
      }

      await founduser.update({ isActive: true });

      res.status(200).json({
         message: "Your account has been successfully verified.",
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function sendOTP(req, res) {
   try {
      let { email } = req.body;

      let foundemail = await User.findOne({ where: { email } });
      if (!foundemail) {
         return res.status(401).json({ message: "Not found user." });
      }

      let otp = await sendMail(email);

      res.status(200).json({ message: "One-time password sent.", otp });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function resetPassword(req, res) {
   try {
      const sekretKey = process.env.OTPKEY || "otpsecret";

      let { email, otp, newPassword } = req.body;

      let { error } = passwordValid.validate({ newPassword });
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let isValid = totp.check(otp, sekretKey + email);

      if (!isValid) {
         return res.status(401).json({ message: "OTP or email is wrong." });
      }

      newPassword = bcrypt.hashSync(newPassword, 10);

      await User.update({ password: newPassword }, { where: { email } });

      res.status(200).json({ message: "Your password updated successfully." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function createAdmin(req, res) {
   try {
      let { error, value } = createAdminValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }
      let { userId } = value;

      let user = await User.findByPk(userId);
      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      await User.update({ role: "ADMIN" }, { where: { id: userId } });

      res.status(200).json({ message: "Admin created successfully." });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
