import dayjs from "dayjs";
import { Event } from "../schemas/events.schema.js";

export const searchEvent = async (activity, city, date) => {
  const requestedDate = dayjs(date);
  const endDate = requestedDate.add(7, "day");

  const query = {
    date: {
      $gte: requestedDate.toDate(),
      $lte: endDate.toDate(),
    },
  };

  if (activity) query.discipline = activity;
  if (city) query.city = city;

  try {
    const events = await Event.find(query).select("city discipline date");
    return events;
  } catch (error) {
    throw error;
  }
};
