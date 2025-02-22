import nodemailer from "nodemailer";
import { totp } from "otplib";

totp.options = { step: 600, digits: 5 };
const transport = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "ibrahimovkamronbek7@gmail.com",
      pass: "wyna uzcb pgrz vdbx",
   },
});

async function sendMail(email) {
   try {
      const sekretKey = process.env.OTPKEY || "otpsecret";
      let otp = totp.generate(sekretKey + email);
      
      await transport.sendMail({
         to: email,
         subject: "One time password",
         text: `Code for verify account ${otp}`,
      });

      return otp;
   } catch (error) {
      console.log(error.message);
   }
}

export default sendMail;
