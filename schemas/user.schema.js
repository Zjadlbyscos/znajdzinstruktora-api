import { Schema, Types, model } from "mongoose";
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
  isInstructor: {
    type: Boolean,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  phoneNumber: {
    type: String,
    default: null,
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
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format is: example@example.com",
  }),
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
 *  schemas:
 *    userRegister:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: Name of new user
 *        email:
 *          type: string
 *          format: email
 *          description: Email of new user, must be unique through database
 *        password:
 *          type: string
 *          format: password
 *          description: User password
 *    userRegisterResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated by database unique id
 *        name:
 *          type: string
 *          description: Name of new user
 *        email:
 *          type: string
 *          description: Email of new user, must be unique through database
 *        password:
 *          type: string
 *          format: password
 *          description: User password
 *        isInstructor:
 *          type: string
 *          nullable: true
 *          description: Defines whether the user is instructor
 *        token:
 *          type: string
 *          description: JSON token
 *        avatarURL:
 *          type: string
 *          description: Url to user avatar
 *        verificationToken:
 *          type: string
 *          description: Defines whether the user confirmed email
 *    userLogin:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          description: Email of new user, must be unique through database
 *        password:
 *          type: string
 *          format: password
 *          description: User password
 *    userLoginResponse:
 *      type: object
 *      properties:
 *        currentToken:
 *          type: string
 *          description: JWT token
 *        name:
 *          type: string
 *          description: User name
 *        email:
 *          type: string
 *          description: User email
 *        subscription:
 *          type: string
 *          description: User email subscription
 *        avatar:
 *          type: string
 *          description: User avatar
 *    changePasswordRequest:
 *      type: object
 *      required:
 *        - email
 *        - oldPassword
 *        - newPassword
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *          description: User email
 *        oldPassword:
 *          type: string
 *          format: password
 *          description: Actual user password
 *        newPassword:
 *          type: string
 *          format: password
 *          description: A new user password
 *    changePasswordResponse:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: Is changing password successful
 *        message:
 *          type: string
 *          description: Message about changing password
 */
