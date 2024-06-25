import { registerSchema } from "../../schemas/user.schema.js";
import { registerUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const register = async (req, res, next) => {
  // validate the request body first
  const validationResult = registerSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      ResponseBody: validationResult.error.details[0].message,
    });
  }

  try {
    // registers a new user in the database
    const newUser = await registerUser(req.body);

    // if user exists return error with status conflict
    if (newUser.error) {
      return next(ApiError.conflict(newUser.error));
    }

    // if no error return with status created
    return res.status(201).json({
      code: 201,
      status: `CREATED`,
      ResponseBody: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
