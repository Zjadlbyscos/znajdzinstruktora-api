import { Schema, model } from "mongoose";
import Joi from "joi";

const passwordResetTokenSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    token: {
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

export const passwordResetTokenValidationSchema = Joi.object({
  email: Joi.string().required(),
});
