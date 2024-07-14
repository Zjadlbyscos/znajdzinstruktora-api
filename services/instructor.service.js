import { Instructor } from "../schemas/instructor.schema.js";

export const addInstructorInfo = async (instructorInfo) => {
  const { bio, phoneNumber, city, discipline, socialMedia, instructorId } =
    instructorInfo;

  const checkInstructor = await Instructor.findOne({ instructorId });

  if (checkInstructor) {
    return { error: `Instructor already exist` };
  }

  const instructor = new Instructor({
    bio,
    phoneNumber,
    city,
    discipline,
    socialMedia,
  });

  await instructor.save();

  return instructor;
};

export const getInstructorId = async (instructorId) => {
  const instructor = await Instructor.findOne({ instructorId });

  return instructor;
};
