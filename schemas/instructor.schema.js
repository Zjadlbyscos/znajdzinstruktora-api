import { Schema, model } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const instructorSchema = new Schema(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    city: {
      type: String,
      ref: "User",
    },
    discipline: {
      type: String,
      ref: "User",
    },
    socialMedia: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

instructorSchema.virtual("name", {
  ref: "User",
  localField: "instructorId",
  foreignField: "_id",
  justOne: true,
  options: { select: "firstName lastName" },
});

export const Instructor = model("Instructor", instructorSchema);

export const instructorInformationSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  language: Joi.string().required(),
  photo: Joi.string().required(),
  discipline: Joi.string().required(),
  socialMedia: Joi.string().allow(null, ""),
});
