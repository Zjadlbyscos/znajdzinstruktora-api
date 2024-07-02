import { Schema, model } from "mongoose";
import Joi from "joi";

const passwordResetTokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    resetToken: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const PasswordResetToken = model(
  "PasswordResetToken",
  passwordResetTokenSchema
);

export const passwordResetRequestTokenValidationSchema = Joi.object({
  email: Joi.string().required(),
});

export const passwordResetTokenValidationSchema = Joi.object({
  email: Joi.string().required(),
  resetToken: Joi.string().required(),
  password: Joi.string().required(),
});
