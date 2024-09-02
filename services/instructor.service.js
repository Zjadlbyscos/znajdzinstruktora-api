import { Instructor } from "../schemas/instructor.schema.js";
import { User } from "../schemas/user.schema.js";

export const createInstructor = async ({ RefUserId }) => {
  try {
    const existingInstructor = await Instructor.findOne({ userId: RefUserId });
    console.log("existingInstructor", existingInstructor);
    if (existingInstructor) {
      return { error: "Instructor already exists" };
    }

    const user = await User.findById(RefUserId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.isInstructor) {
      return { error: "User is already an instructor" };
    }

    user.isInstructor = true;
    await user.save();

    const instructor = new Instructor({
      userId: user._id,
      city: user.city,
      discipline: user.discipline,
    });

    await instructor.save();

    return { instructor };
  } catch (error) {
    throw new Error(error);
  }
};

export const getInstructorId = async (instructorId) => {
  const instructor = await Instructor.findById({ instructorId });

  return instructor;
};

export const updateInstructor = async (instructorId, updateData) => {
  try {
    const existingInstructor = await Instructor.findOne({ _id: instructorId });

    if (!existingInstructor) {
      return { error: "Instructor not found" };
    }

    Object.assign(existingInstructor, updateData);
    await existingInstructor.save();

    return existingInstructor;
  } catch (error) {
    console.error("Error updating instructor:", error);
    throw new Error(error);
  }
};
