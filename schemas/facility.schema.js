import { Schema, model } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const facilitySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
});

export const Facility = model("Facility", facilitySchema);
