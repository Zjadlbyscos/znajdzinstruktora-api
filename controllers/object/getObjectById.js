import { ApiError } from "../../utils/errors/apiError.js";
import { getObjectId } from "../../services/object.service.js";

export const getObjectById = async (req, res, next) => {
  try {
    const { objectId } = req.params;

    const object = await getObjectId(objectId);

    if (!object) {
      return next(ApiError.notFound("Object not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      object,
    });
  } catch (error) {
    next(error);
  }
};
