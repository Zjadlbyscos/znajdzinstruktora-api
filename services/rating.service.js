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

export const getRatings = async (instructorId) => {
  try {
    const instructor = await Instructor.findById({ _id: instructorId });

    if (!instructor) {
      return { error: "Instructor not found" };
    }

    const ratings = await Rating.find({ instructorId });

    if (!ratings) {
      return { error: "No ratings found" };
    }

    return ratings;
  } catch (error) {
    throw new Error(error);
  }
};
