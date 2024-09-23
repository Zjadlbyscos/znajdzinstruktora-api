import { searchEvent } from "../../services/search.service.js";

export const getSearchedEvent = async (req, res, next) => {
  try {
    const { activity, city, date } = req.query;

    console.log(`Activity: ${activity}, City: ${city}, Date: ${date}`);

    const result = await searchEvent(activity, city, date);

    return res.status(200).json({
      code: 200,
      status: "OK",
      result,
    });
  } catch (error) {
    next(error);
  }
};
