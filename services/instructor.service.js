import { Instructor } from "../schemas/instructor.schema.js";

export const addInstructorInfo = async (instructorInfo) => {
  const {
    bio,
    phoneNumber,
    discipline,
    socialMedia,
    instructorId,
    photo,
    language,
    name,
  } = instructorInfo;

  const checkInstructor = await Instructor.findOne({ instructorId });

  if (checkInstructor) {
    return { error: `Instructor already exist` };
  }

  const instructor = new Instructor({
    instructorId,
    name,
    photo,
    bio,
    phoneNumber,
    discipline,
    socialMedia,
    language,
  });

  await instructor.save();

  return instructor;
};

export const getInstructorId = async (instructorId) => {
  const instructor = await Instructor.findOne({ instructorId });

  return instructor;
};
