import { activateUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.body;

  try {
    const activationResult = await activateUser(verificationToken);

    if (activationResult.error) {
      return next(ApiError.conflict(activationResult.error));
    }

    return res.status(200).json({
      code: 200,
      status: "SUCCESS",
      responseBody: activationResult.message,
    });
  } catch (error) {
    next(error);
  }
};
