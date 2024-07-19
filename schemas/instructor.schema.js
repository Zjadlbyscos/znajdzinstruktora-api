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
    contact: {
      phoneNumber: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
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
  bio: Joi.string(),
  contact: Joi.object({
    phoneNumber: Joi.string(),
    email: Joi.string(),
  }),
  socialMedia: Joi.string(),
  classLevel: Joi.array(),
  languages: Joi.array(),
  photo: Joi.string(),
});
