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

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         verified:
 *           type: boolean
 *           description: Indicates if the user's email has been verified
 *         isInstructor:
 *           type: boolean
 *           description: Indicates if the user is an instructor
 *         token:
 *           type: string
 *           nullable: true
 *           description: Authentication token for the user
 *         avatarURL:
 *           type: string
 *           nullable: true
 *           description: URL to the user's avatar image
 *         verificationToken:
 *           type: string
 *           description: Token used for email verification
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           description: Phone number of the user
 *         city:
 *           type: string
 *           nullable: true
 *           description: City where the user is located
 *         discipline:
 *           type: string
 *           nullable: true
 *           description: Discipline or field of expertise of the user
 *         terms:
 *           type: boolean
 *           description: Indicates if the user has agreed to terms
 *         emailConsent:
 *           type: boolean
 *           description: Indicates if the user has consented to email communication
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - verificationToken
 *         - terms
 *         - emailConsent
 *         - city
 *         - discipline
 *     RegisterInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - terms
 *         - emailConsent
 *         - city
 *         - discipline
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         terms:
 *           type: boolean
 *           description: Indicates if the user has agreed to terms
 *         emailConsent:
 *           type: boolean
 *           description: Indicates if the user has consented to email communication
 *         city:
 *           type: string
 *           description: City where the user is located
 *         discipline:
 *           type: string
 *           description: Discipline or field of expertise of the user
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *     SubscribeInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address to subscribe
 *     ChangePasswordInput:
 *       type: object
 *       required:
 *         - token
 *         - password
 *         - newPassword
 *       properties:
 *         token:
 *           type: string
 *           description: Token used for password change request
 *         password:
 *           type: string
 *           description: Current password of the user
 *         newPassword:
 *           type: string
 *           description: New password for the user
 *     RequestResetPasswordInput:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address to request password reset
 */
