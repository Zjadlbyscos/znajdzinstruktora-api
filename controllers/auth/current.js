import { currentUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const current = async (req, res, next) => {
  try {
    const id = req.user.id;
    const loggedUser = await currentUser(id);

    // Current user unauthorized error
    if (!loggedUser) {
      return next(ApiError.unauthorized("User not found"));
    }

    const { email, firstName, lastName, city, phoneNumber, language } =
      loggedUser.user;

    // Current user success response
    return res.status(200).json({
      code: 200,
      status: "OK",
      ResponseBody: {
        email,
        id,
        name: {
          firstName,
          lastName,
        },
        city,
        phoneNumber,
        language,
      },
    });
  } catch (error) {
    next(error);
  }
};
