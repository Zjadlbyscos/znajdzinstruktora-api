import { Instructor } from "../../schemas/instructor.schema.js";

export const getAllInstructors = async (req, res, next) => {
  try {
    const allInstructors = await Instructor.find();
    return res.status(200).json(allInstructors);
  } catch (error) {
    next(error);
  }
};
