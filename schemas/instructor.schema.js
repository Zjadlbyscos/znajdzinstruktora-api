import { Schema, model } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const instructorSchema = new Schema(
  {
    refUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    socialMedia: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      ref: "User",
    },
    discipline: {
      type: String,
      ref: "User",
    },
    classLevel: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    photo: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Instructor = model("Instructor", instructorSchema);

export const createInstructorSchema = Joi.object({
  id: Joi.objectId(),
});

export const updateInstructorSchema = Joi.object({
  id: Joi.objectId().required(),
  bio: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  email: Joi.string().email().optional(),
  socialMedia: Joi.string().optional(),
  photo: Joi.string().optional(),
  classLevel: Joi.array().items(Joi.string()).optional(),
  languages: Joi.array().items(Joi.string()).optional(),
});
