import { Instructor } from "../schemas/instructor.schema";
import { Rating } from "../schemas/rating.schema";
import { User } from "../schemas/user.schema";

export const rateInstructor = async (instructorId, userId, rating, comment) => {
  console.log("instructorId", instructorId);
  console.log("userId", userId);
  console.log("rating", rating);
  console.log("comment", comment);
  try {
    const instructor = await Instructor.findById({ _id: instructorId });

    console.log("instructor", instructor);

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
    });

    await newRating.save();
  } catch (error) {
    throw new Error(error);
  }
};
