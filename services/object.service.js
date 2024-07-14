import { Object } from "../schemas/object.schema.js";

export const getObjectId = async (objectId) => {
  const object = await Object.findOne({ objectId });

  return object;
};
