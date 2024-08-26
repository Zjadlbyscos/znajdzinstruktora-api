import { model, Schema } from "mongoose";
import Joi from "joi";

export const eventSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
  title: {
    type: String,
    required: false,
  },
  classLevel: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avaiable: {
    type: Boolean,
    required: true,
    default: true,
  },
  facilityId: {
    type: Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
});

export const Event = model("Event", eventSchema);

export const createEventSchema = Joi.object({
  instructorId: Joi.objectId().required(),
  title: Joi.string().min(3).max(255).required(),
  classLevel: Joi.array().items(Joi.string()).required(),
  description: Joi.string().min(10).optional(),
  date: Joi.date().required(),
  duration: Joi.number().integer().min(1).required(),
  address: Joi.string().min(5).required(),
  avaiable: Joi.boolean().required(),
  facilityId: Joi.objectId().required(),
});
