import { updateInstructorSchema } from "../../schemas/instructor.schema.js";
import { updateInstructor } from "../../services/instructor.service.js";
import { uploadRecipeImage } from "../../utils/cloudinary.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const updateInstructorInfo = async (req, res, next) => {
  const updateData = { ...req.body };

  if (typeof updateData.classLevel === "string") {
    try {
      updateData.classLevel = JSON.parse(updateData.classLevel);
    } catch (e) {
      return next(ApiError.badRequest("Invalid format for classLevel"));
    }
  }

  if (typeof updateData.languages === "string") {
    try {
      updateData.languages = JSON.parse(updateData.languages);
    } catch (e) {
      return next(ApiError.badRequest("Invalid format for languages"));
    }
  }

  const { error, value } = updateInstructorSchema.validate(updateData);
  if (error) {
    return next(ApiError.badRequest(error.details[0].message));
  }

  try {
    const { id } = value;
    let photo = null;

    if (req.file) {
      const result = await uploadRecipeImage(req.file.buffer);
      photo = result.secure_url;
    }

    if (photo) {
      value.photo = photo;
    }

    const updatedInstructor = await updateInstructor(id, value);

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
    console.error("Update Instructor Error:", error);
    next(error);
  }
};
