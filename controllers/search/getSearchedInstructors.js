import dayjs from "dayjs";
import { searchInstructors } from "../../services/search.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const getSearchedInstructors = async (req, res, next) => {
  try {
    const { discipline, city, date } = req.query;

    const instructors = await searchInstructors(discipline, city, date);

    if (!instructors) {
      return next(ApiError.notFound("Instructors not found"));
    }

    const filter = {};
    if (discipline) filter.discipline = discipline;
    if (city) filter.city = city;

    return res.status(200).json({
      code: 200,
      status: "OK",
      instructors,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
