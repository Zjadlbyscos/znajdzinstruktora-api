import { Instructor } from "../../schemas/instructor.schema.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getAllInstructors = async (req, res, next) => {
  try {
    const { city, discipline, languages } = req.query;
    const filters = {};

    const { limit = 10, page = 1 } = req.query;
    const pageLimit = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * pageLimit;

    if (city) filters.city = city;
    if (discipline) filters.discipline = discipline;
    if (languages) filters.languages = languages;

    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key]
    );

    const instructors = await Instructor.find(filters)
      .skip(skip)
      .limit(pageLimit);
    const totalInstructors = await Instructor.countDocuments();
    const totalPages = Math.ceil(totalInstructors / pageLimit);

    return res.status(200).json({
      instructors,
      totalInstructors,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error);
  }
};
