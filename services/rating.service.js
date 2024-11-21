import { Instructor } from "../schemas/instructor.schema.js";
import { Rating } from "../schemas/rating.schema.js";
import { User } from "../schemas/user.schema.js";

export const rateInstructor = async (instructorId, userId, rating, comment) => {
  try {
    const instructor = await Instructor.findById({ _id: instructorId });

    if (!instructor) {
      return { error: "Instructor not found" };
    }

    const user = await User.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    const existingRating = await Rating.findOne({ instructorId, userId });
    if (existingRating) {
      throw new Error("User has already rated this instructor");
    }

    const newRating = new Rating({
      instructorId,
      userId,
      rating,
      comment,
      userFullName: `${user.firstName} ${user.lastName}`,
    });

    await newRating.save();

    return newRating;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRatings = async (instructorId, limit, page) => {
  try {
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    const pageLimit = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * pageLimit;

    const ratings = await Rating.find({ instructorId })
      .skip(skip)
      .limit(pageLimit)
      .sort({ createdAt: -1 });

    const totalRatings = await Rating.countDocuments({ instructorId });

    return {
      ratings,
      pagination: {
        total: totalRatings,
        page: parseInt(page, 10),
        limit: pageLimit,
      },
    };
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching ratings"
    );
  }
};
