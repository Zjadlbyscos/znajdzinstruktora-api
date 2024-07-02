import crypto from "crypto";

import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const generatePasswordResetToken = () => {
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

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `http://localhost:3000/resetowanie-hasla/${resetToken}`;
  const transporter = createTransport(createTransportOptions);
  return await transporter
    .sendMail({
      from: process.env.NODEMAILER_FROM_MAIL,
      to: email,
      subject: "Resetowanie hasła",
      html: `Aby zresetować hasło, kliknij w poniższy link: <a href="${resetLink}">Resetuj hasło</a>`,
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
