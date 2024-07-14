import { Object } from "../../schemas/object.schema.js";

export const getAllObjects = async (req, res, next) => {
  try {
    const allObjects = await Object.find();
    return res.status(200).json(allObjects);
  } catch (error) {
    next(error);
  }
};
