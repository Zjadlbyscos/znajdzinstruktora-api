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
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
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
  discipline: {
    type: String,
    required: true,
    ref: "User",
  },
});

export const Event = model("Event", eventSchema);

export const createEventSchema = Joi.object({
  instructorId: Joi.objectId().required(),
  classLevel: Joi.array().items(Joi.string()).required(),
  description: Joi.string().optional(),
  date: Joi.date().required(),
  duration: Joi.number().integer().min(1),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
  address: Joi.string(),
  avaiable: Joi.boolean().required(),
  facilityId: Joi.objectId().required(),
  discipline: Joi.string().required(),
});
