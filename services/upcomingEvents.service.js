import { Event } from "../schemas/events.schema.js";
import moment from "moment";
import { User } from "../schemas/user.schema.js";
import { Facility } from "../schemas/facility.schema.js";

export const getEventsForUser = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found:", userId);
      throw new Error("User not found");
    }

    const city = user.city;
    const startDate = moment().startOf("day").toDate();
    const endDate = moment().add(7, "days").endOf("day").toDate();

    const facilities = await Facility.find({ city: city });

    const facilityIds = facilities.map((facility) => facility._id);

    const events = await Event.aggregate([
      {
        $match: {
          facilityId: { $in: facilityIds },
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: "facilities",
          localField: "facilityId",
          foreignField: "_id",
          as: "facility",
        },
      },
      { $unwind: "$facility" },
      {
        $project: {
          _id: 1,
          title: 1,
          date: 1,
          time: 1,
          duration: 1,
          facility: {
            _id: 1,
            name: 1,
            city: 1,
            address: 1,
          },
        },
      },
      { $sort: { date: 1, time: 1 } },
    ]).exec();

    return events;
  } catch (error) {
    console.error("Error getting events for user:", error);
    throw error;
  }
};
