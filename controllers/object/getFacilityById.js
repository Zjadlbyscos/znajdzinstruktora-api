import { ApiError } from "../../utils/errors/apiError.js";
import { getFacilityId } from "../../services/facility.service.js";

export const getFacilityById = async (req, res, next) => {
  try {
    const { facilityId } = req.params;

    const facility = await getFacilityId(facilityId);

    if (!facility) {
      return next(ApiError.notFound("Facility not found"));
    }

    return res.status(200).json({
      code: 200,
      status: `OK`,
      facility,
    });
  } catch (error) {
    next(error);
  }
};
