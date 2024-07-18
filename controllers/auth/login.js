import { loginSchema } from "../../schemas/user.schema.js";
import { loginUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const login = async (req, res, next) => {
  // Login validation error
  const validationResult = loginSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }
  try {
    const loggedUser = await loginUser(req.body);

    // if user exists return error with status conflict
    if (loggedUser.error) {
      return next(ApiError.unauthorized(loggedUser.error));
    }

    const { id, firstName, lastName, email, city, discipline } =
      loggedUser?.user;

    return res.status(200).json({
      RequestBody: {
        "Current token": loggedUser?.token,
        user: {
          id,
          firstName,
          lastName,
          email,
          city,
          discipline,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
