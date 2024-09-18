import { Instructor } from "../schemas/instructor.schema.js";
import { User } from "../schemas/user.schema.js";

export const createInstructor = async ({ refUserId }) => {
  try {
    const user = await User.findById(refUserId);
    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isInstructor) {
      return { error: "User is already an instructor" };
    }

    const existingInstructor = await Instructor.findOne({
      refUserId: user._id,
    });
    if (existingInstructor) {
      return { error: "Instructor already exists" };
    }

    user.isInstructor = true;
    await user.save();

    const instructor = new Instructor({
      refUserId: user._id,
      city: user.city,
      discipline: user.discipline,
      fullName: `${user.firstName} ${user.lastName}`,
    });

    await instructor.save();

    user.instructorId = instructor._id;
    await user.save();

    return instructor;
  } catch (error) {
    throw new Error(error);
  }
};

export const getInstructorId = async (id) => {
  const instructor = await Instructor.findById({ _id: id });

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
    console.log("Error updating instructor:", error);
    throw new Error(error);
  }
};
