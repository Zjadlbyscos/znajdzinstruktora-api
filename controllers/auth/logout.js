import { logoutUser } from "../../services/auth.service.js";
import { ApiError } from "../../utils/errors/apiError.js";

export const logout = async (req, res, next) => {
  try {
    if (!req.user || !req.user.token) {
      return next(ApiError.unauthorized(`Unauthorized`));
    }
    const { id } = req.user;
    // Logout success response
    logoutUser(id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
