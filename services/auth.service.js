import { User } from "../schemas/user.schema.js";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  generateVerificationKey,
  sendEmail,
} from "../utils/nodemailer/registerEmail.js";
import { PasswordResetToken } from "../schemas/passwordResetToken.schema.js";
import { sendPasswordResetEmail } from "../utils/nodemailer/resetPasswordEmail.js";

// Register user
export const registerUser = async (data) => {
  const {
    firstName,
    lastName,
    password,
    email,
    discipline,
    city,
    terms,
    emailConsent,
  } = data;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const verificationToken = generateVerificationKey();

  //find an existing user
  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return { error: `User already registered` };
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    terms,
    emailConsent,
    avatarURL,
    verify: false,
    verificationToken,
    discipline,
    city,
  });
  await user.save();
  await sendEmail(firstName, email, verificationToken);

  return user;
};

// Login
export const loginUser = async (data) => {
  const { password, email } = data;
  const user = await User.findOne({ email });

  if (!user) {
    return {
      error: "User probably does not exist, check the correctness of the data",
    };
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  // Login auth error
  if (!user || !passwordCompare) {
    return { error: "Email or password is wrong" };
  }

  // Login success response
  const payload = {
    id: user._id,
  };

  const { TOKEN_KEY } = process.env;

  const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: "7d" });
  await User.findByIdAndUpdate(user._id, { token });
  return { user, token };
};

// Logout
export const logoutUser = async (id) => {
  await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });
  return;
};

// user logged
export const currentUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return { error: "Unauthorized" };
  }
  return { user };
};

export const changeUserPassword = async (data) => {
  const { email, newPassword, password: oldPassword } = data;
  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Unauthorized" };
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return { error: "Unauthorized" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashPassword;

  await user.save();

  return { success: true, message: "Password has been reset successfully." };
};

export const changeUserPasswordByReset = async (data) => {
  const { email, resetToken, password } = data;

  const resetRecord = await PasswordResetToken.findOne({
    email,
    resetToken,
  });
  if (!resetRecord) {
    return { error: "Invalid or expired reset token" };
  }

  if (resetRecord.expiryDate < Date.now()) {
    return { error: "Reset token has expired" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ email });
  if (!user) {
    return { error: "User not found" };
  }

  user.password = hashPassword;
  await user.save();

  await resetRecord.deleteOne();

  return { success: true, message: "Password has been reset successfully." };
};

export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { error: "User not found" };
  }

  const generateResetToken = crypto.randomBytes(20).toString("hex");

  const expireAt = Date.now() + 900000;

  await new PasswordResetToken({
    email: user.email,
    resetToken: generateResetToken,
    expiryDate: new Date(expireAt),
  }).save();

  await sendPasswordResetEmail(email, generateResetToken);

  return {
    success: true,
    message: "Reset email has been sent successfully. Check your email.",
  };
};
