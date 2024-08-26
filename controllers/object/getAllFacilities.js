import { Facility } from "../../schemas/facility.schema.js";

export const getAllFacilities = async (req, res, next) => {
  try {
    const allFacilities = await Facility.find();
    return res.status(200).json(allFacilities);
  } catch (error) {
    next(error);
  }
};
