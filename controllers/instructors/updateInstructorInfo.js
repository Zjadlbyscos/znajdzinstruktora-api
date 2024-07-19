import { updateInstructorSchema } from "../../schemas/instructor.schema.js";
import { updateInstructor } from "../../services/instructor.service.js";

export const updateInstructorInfo = async (req, res, next) => {
  const validationResult = updateInstructorSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const { instructorId } = req.body;
    const updateData = req.body;

    const updatedInstructor = await updateInstructor(instructorId, updateData);

    if (updatedInstructor.error) {
      return next(ApiError.conflict(updatedInstructor.error));
    }

    return res.status(200).json({
      code: 200,
      status: "OK",
      ResponseBody: {
        updatedInstructor,
      },
    });
  } catch (error) {
    next(error);
  }
};
