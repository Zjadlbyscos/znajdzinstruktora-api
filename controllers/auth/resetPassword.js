import { passwordResetTokenValidationSchema } from "../../schemas/passwordResetToken.schema.js";
import { changeUserPasswordByReset } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const resetPassword = async (req, res, next) => {
  const validationResult = passwordResetTokenValidationSchema.validate(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const resetStatus = await changeUserPasswordByReset(req.body);

    if (resetStatus.error) {
      return next(ApiError.conflict(resetStatus.error));
    }

    return res.status(200).json({
      code: 200,
      status: `SUCCESS`,
      responseBody: {
        resetStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};
