import { Facility } from "../../schemas/facility.schema.js";

export const getAllFacilities = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const pageLimit = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * pageLimit;

    const allFacilities = await Facility.find().skip(skip).limit(pageLimit);
    const totalFacilities = await Facility.countDocuments();
    const totalPages = Math.ceil(totalFacilities / pageLimit);

    return res.status(200).json({
      facilities: allFacilities,
      totalFacilities,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error);
  }
};
