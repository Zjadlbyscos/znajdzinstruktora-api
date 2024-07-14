import { Instructor } from "../../schemas/instructor.schema.js";

export const getAllInstructors = async (req, res, next) => {
  try {
    const allInstrucotrs = await Instructor.find();
    return res.status(200).json(allInstrucotrs);
  } catch (error) {
    next(error);
  }
};
