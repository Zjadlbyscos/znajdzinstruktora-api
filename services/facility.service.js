import { Facility } from "../schemas/facility.schema.js";

export const getFacilityId = async (facilityId) => {
  const facility = await Facility.findOne({ facilityId });

  return facility;
};
