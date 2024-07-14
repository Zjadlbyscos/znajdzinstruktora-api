import { ApiError } from "../../utils/errors/apiError.js";
import { addInstructorInfo } from "../../services/instructor.service.js";
import { instructorInformationSchema } from "../../schemas/instructor.schema.js";

export const addInstructor = async (req, res, next) => {
  const validationResult = instructorInformationSchema.validate(req.body);
  if (validationResult.error) {
    return next(ApiError.badRequest(validationResult.error.details[0].message));
  }

  try {
    const userId = req.params.id;
    const newInstructor = await addInstructorInfo({
      ...req.body,
      instructorId: userId,
    });

    if (newInstructor.error) {
      return next(ApiError.conflict(newInstructor.error));
    }

    return res.status(201).json({
      code: 201,
      status: "CREATED",
      ResponseBody: {
        newInstructor,
      },
    });
  } catch (error) {
    next(error);
  }
};
