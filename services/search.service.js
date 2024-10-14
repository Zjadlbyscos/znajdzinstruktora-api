import dayjs from "dayjs";
import { Instructor } from "../schemas/instructor.schema.js";

export const searchInstructors = async (
  discipline,
  city,
  date,
  pageLimit,
  skip
) => {
  const requestedDate = dayjs(date);
  const endDate = requestedDate.add(7, "day");

  const eventDateQuery = {
    date: {
      $gte: requestedDate.toDate(),
      $lte: endDate.toDate(),
    },
  };

  const instructorQuery = {};
  if (discipline) instructorQuery.discipline = discipline;
  if (city) instructorQuery.city = city;

  try {
    const instructors = await Instructor.find(instructorQuery)
      .populate({
        path: "events",
        match: eventDateQuery,
      })
      .select("city discipline date image fullName bio")
      .skip(skip)
      .limit(pageLimit);

    return instructors;
  } catch (error) {
    console.error("Error searching for instructors:", error);
    throw error;
  }
};
