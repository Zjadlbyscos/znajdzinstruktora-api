import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectToDatabase = async (dbHostUrl) =>
  await mongoose.connect(dbHostUrl);
