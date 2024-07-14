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

/**
 * @openapi
 * components:
 *   schemas:
 *     PasswordResetToken:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the password reset token
 *         email:
 *           type: string
 *           description: The email associated with the user requesting password reset
 *         resetToken:
 *           type: string
 *           description: The token generated for password reset
 *         expiryDate:
 *           type: string
 *           format: date-time
 *           description: The expiry date and time of the reset token
 *       required:
 *         - email
 *         - resetToken
 *         - expiryDate
 *     PasswordResetRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email address for which password reset is requested
 *       required:
 *         - email
 *     PasswordReset:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email address associated with the password reset request
 *         resetToken:
 *           type: string
 *           description: The token provided for password reset
 *         password:
 *           type: string
 *           description: The new password to be set
 *       required:
 *         - email
 *         - resetToken
 *         - password
 */
