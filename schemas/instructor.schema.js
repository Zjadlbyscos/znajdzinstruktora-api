import { Schema, model } from "mongoose";
import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

const instructorSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
    required: [true, "City is required"],
  },
  discipline: {
    type: String,
    required: [true, "Discipline is required"],
  },
  socialMedia: {
    type: String,
    default: null,
  },
});

export const Instructor = model("Instructor", instructorSchema);

export const instructorInformationSchema = Joi.object({
  bio: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  city: Joi.string().required(),
  discipline: Joi.string().required(),
  socialMedia: Joi.string().allow(null, ""),
});
/**
 * @openapi
 * components:
 *   schemas:
 *     Instructor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the instructor
 *         instructorId:
 *           type: string
 *           description: The ID of the associated user
 *         bio:
 *           type: string
 *           description: Biography of the instructor
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the instructor
 *         city:
 *           type: string
 *           description: City where the instructor is located
 *         discipline:
 *           type: string
 *           description: Discipline or field of expertise of the instructor
 *         socialMedia:
 *           type: string
 *           nullable: true
 *           description: Link to the instructor's social media profile
 *     InstructorInput:
 *       type: object
 *       required:
 *         - bio
 *         - phoneNumber
 *         - city
 *         - discipline
 *       properties:
 *         bio:
 *           type: string
 *           description: Biography of the instructor
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the instructor
 *         city:
 *           type: string
 *           description: City where the instructor is located
 *         discipline:
 *           type: string
 *           description: Discipline or field of expertise of the instructor
 *         socialMedia:
 *           type: string
 *           nullable: true
 *           description: Link to the instructor's social media profile
 */
