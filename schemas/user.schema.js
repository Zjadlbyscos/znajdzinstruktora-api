import { Schema, model } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // example@example.com

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    match: [emailRegexp, "Invalid email format provided"],
    required: [true, "Email is required"],
    index: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: [true, "Set password for user"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  city: {
    type: String,
    default: null,
  },
  discipline: {
    type: String,
    default: null,
  },
  terms: {
    type: Boolean,
    default: false,
  },
  emailConsent: {
    type: Boolean,
    default: false,
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
});

export const User = model("user", userSchema);

export const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
  password: Joi.string().min(3).required(),
  terms: Joi.boolean().required(),
  emailConsent: Joi.boolean().required(),
  city: Joi.string().required(),
  discipline: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
  password: Joi.string().min(3).required(),
});

export const subscribeSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
});

export const changePasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(3).required(),
  newPassword: Joi.string().min(3).required(),
});

export const requestResetPasswordSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
});
