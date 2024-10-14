import dayjs from "dayjs";
import { Instructor } from "../../schemas/instructor.schema.js";
import { searchInstructors } from "../../services/search.service.js";

export const getSearchedInstructors = async (req, res, next) => {
  try {
    const { discipline, city, date, limit = 4, page = 1 } = req.query;

    const pageLimit = Math.min(parseInt(limit), 10);
    const skip = (parseInt(page) - 1) * pageLimit;

    const instructors = await searchInstructors(
      discipline,
      city,
      date,
      pageLimit,
      skip
    );

    const filter = {};
    if (discipline) filter.discipline = discipline;
    if (city) filter.city = city;

    const totalInstructors = await Instructor.find(filter)
      .populate({
        path: "events",
        match: {
          date: {
            $gte: dayjs(date).toDate(),
            $lte: dayjs(date).add(7, "day").toDate(),
          },
        },
      })
      .countDocuments();

    const totalPages = Math.ceil(totalInstructors / pageLimit);

    return res.status(200).json({
      code: 200,
      status: "OK",
      instructors,
      totalInstructors,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
