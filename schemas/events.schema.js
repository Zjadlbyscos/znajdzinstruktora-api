import { model, Schema } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

export const eventSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
  title: {
    type: String,
    required: true,
  },
  classLevel: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
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
  adress: {
    type: String,
    required: true,
  },
  avaiable: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Event = model("Event", eventSchema);

Joi.objectId = objectId(Joi);

export const createEventSchema = Joi.object({
  instructorId: Joi.objectId().required(),
  eventId: Joi.objectId(),
  title: Joi.string().min(3).max(255).required(),
  classLevel: Joi.array().items(Joi.string()).required(),
  description: Joi.string().min(10).optional(),
  date: Joi.date().required(),
  duration: Joi.number().integer().min(1).required(),
  adress: Joi.string().min(5).required(),
  avaiable: Joi.boolean().required(),
});
