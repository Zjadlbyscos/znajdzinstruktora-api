import { resetPasswordSchema } from "../../schemas/user.schema.js";
import { changeUserPassword } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const changePassword = async (req, res, next) => {
  const validationResult = resetPasswordSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    const change = await changeUserPassword(req.body);

    if (change.error) {
      return next(ApiError.unauthorized(change.error));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      ResponseBody: {
        change,
      },
    });
  } catch (error) {
    next(error);
  }
};
