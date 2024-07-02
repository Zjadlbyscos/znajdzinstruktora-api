import { passwordResetRequestTokenValidationSchema } from "../../schemas/passwordResetToken.schema.js";
import { requestPasswordReset } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const sendRequestPasswordReset = async (req, res, next) => {
  const validationResult = passwordResetRequestTokenValidationSchema.validate(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const resetStatus = await requestPasswordReset(req.body.email);

    if (resetStatus.error) {
      return next(ApiError.conflict(resetStatus.error));
    }

    return res.status(200).json({
      code: 200,
      status: `SUCCESS`,
      message: "Email do resetowania hasła został wysłany.",
    });
  } catch (error) {
    next(error);
  }
};
