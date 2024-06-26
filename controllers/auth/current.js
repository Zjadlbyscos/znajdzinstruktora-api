import { currentUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const current = async (req, res, next) => {
  try {
    const id = req.user.id;
    const loggedUser = await currentUser(id);

    // Current user unauthorized error
    if (!loggedUser) {
      return next(ApiError.unauthorized(loggedUser.error));
    }

    const { email, isInstructor, name, avatarURL } = loggedUser.user;

    // Current user success response
    return res.status(200).json({
      code: 200,
      status: `OK`,
      ResponseBody: {
        email: email,
        isInstructor: isInstructor,
        name: name,
        avatarURL: avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
