import Joi from "joi";
import { Schema, model } from "mongoose";

const ratingSchema = new Schema(
  {
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    userFullName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

ratingSchema.index({ instructorId: 1, userId: 1 }, { unique: true });

export const Rating = model("Rating", ratingSchema);

export const addRatingSchema = Joi.object({
  instructorId: Joi.objectId().required(),
  userId: Joi.objectId().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string(),
});
