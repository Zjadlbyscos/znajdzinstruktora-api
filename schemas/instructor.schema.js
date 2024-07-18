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
