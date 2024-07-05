import crypto from "crypto";

import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const generateVerificationKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const createTransportOptions = {
  service: process.env.NODEMAILER_SERVICE,
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secureConnection: false,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const sendEmail = async (name, email, verificationToken) => {
  const activationLink = `http://localhost:3000/aktywacja/${verificationToken}`;
  const transporter = createTransport(createTransportOptions);
  return await transporter
    .sendMail({
      from: process.env.NODEMAILER_FROM_MAIL,
      to: email,
      subject: "Witaj w naszym serwisie! Potwierdź swój adres email.",
      html: `Witaj, ${name} <br> Kliknij w link, aby potwierdzić swój adres email: <a href="${activationLink}">Kliknij tutaj</a>`,
    })
    .then((info) => {
      console.log(info);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
