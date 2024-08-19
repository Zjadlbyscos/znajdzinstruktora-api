import { Schema } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

export const eventSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  title: {
    type: String,
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
  time: {
    type: String,
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
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const Event = model("Event", eventSchema);

Joi.objectId = objectId(Joi);

export const validateEvent = (event) => {
  const schema = Joi.object({
    instructorId: Joi.objectId().required(),
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(10).required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    duration: Joi.number().integer().min(1).required(),
    adress: Joi.string().min(5).required(),
    status: Joi.boolean().required(),
  });
};
