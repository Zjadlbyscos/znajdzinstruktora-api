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
    fullName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    tiktok: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
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
    image: {
      type: String,
      default: null,
    },
    events: {
      type: [Schema.Types.ObjectId],
      ref: "Event",
      default: null,
    },
    type: {
      type: String,
      default: "instructor",
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
  instagram: Joi.string().optional(),
  tiktok: Joi.string().optional(),
  youtube: Joi.string().optional(),
  facebook: Joi.string().optional(),
  image: Joi.string().optional(),
  classLevel: Joi.array().items(Joi.string()).optional(),
  languages: Joi.array().items(Joi.string()).optional(),
});
