import { createInstructorSchema } from "../../schemas/instructor.schema.js";
import { createInstructor } from "../../services/instructor.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const createNewInstructor = async (req, res, next) => {
  const validationResult = createInstructorSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const { id } = req.params;
    const newInstructor = await createInstructor({
      refUserId: id,
    });

    if (newInstructor.error) {
      return next(ApiError.conflict(newInstructor.error));
    }

    return res.status(201).json({
      code: 201,
      status: "CREATED",
      newInstructor,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
