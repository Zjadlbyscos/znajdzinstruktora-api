import express from "express";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

import { register } from "../../controllers/auth/register.js";
import { login } from "../../controllers/auth/login.js";
import { current } from "../../controllers/auth/current.js";
import { logout } from "../../controllers/auth/logout.js";
import { changePassword } from "../../controllers/auth/changePassword.js";
import { sendRequestPasswordReset } from "../../controllers/auth/requestPasswordReset.js";
import { resetPassword } from "../../controllers/auth/resetPassword.js";
import { verifyEmail } from "../../controllers/auth/verifyEmail.js";

/**
 * @openapi
 * tags:
 *  name: auth
 *  description: User authentication
 */

/**
 * @openapi
 * /auth/register:
 *  post:
 *   summary: Returns an object containing the newly registered user
 *   tags: [auth]
 *   security: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/userRegister"
 *   responses:
 *     201:
 *       description: User is registered
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userRegisterResponse"
 *     400:
 *       description: Bad request (invalid request body)
 *       content:
 *         application/json:
 *           example: "\"password\" is required"
 *     409:
 *       description: Conflict
 *       content:
 *         application/json:
 *           example: User already registered
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *  post:
 *   summary: Returns object with new user data
 *   tags: [auth]
 *   security: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/userLogin"
 *   responses:
 *     200:
 *       description: User is logged in, new JWT token generated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userLoginResponse"
 *     400:
 *       description: Bad request (invalid request body)
 *       content:
 *         application/json:
 *           example: "\"password\" is required"
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example: Email or password is wrong
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/current:
 *  get:
 *   summary: Returns information about the logged in user
 *   tags: [auth]
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Logged in user data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/userLoginResponse"
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example: Unauthorized
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 */
router.get("/current", auth, current);

/**
 * @openapi
 * /auth/logout:
 *  post:
 *   summary: Log out user, destroy JWT
 *   tags: [auth]
 *   security:
 *     - bearerAuth: []
 *       description: User token
 *   responses:
 *     204:
 *       description: User is logged out, JWT token destroyed
 *       content:
 *         application/json:
 *           example: No Content
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example: Unauthorized
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: Internal Server Error
 *
 */
router.post("/logout", auth, logout);

/**
 * @openapi
 * /auth/change-password:
 *  post:
 *   summary: Zmienia hasło użytkownika
 *   tags: [auth]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             currentPassword:
 *               type: string
 *               description: Current User Password
 *             newPassword:
 *               type: string
 *               description: New User Password
 *           required:
 *             - currentPassword
 *             - newPassword
 *   responses:
 *     200:
 *       description:  Password changed successfully
 *       content:
 *         application/json:
 *           example: { "message": "Password changed sucessfully" }
 *     400:
 *       description: Bad Request (
 *       content:
 *         application/json:
 *           example: { "error": "\"currentPassword\" is required" }
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example: { "error": "Unauthorized" }
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: { "error": "Internal Server Error" }
 */
router.post("/change-password", auth, changePassword);

/**
 * @openapi
 * /auth/request-reset-password:
 *  post:
 *   summary: Sends a password reset request
 *   tags: [auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's email to send password reset link
 *           required:
 *             - email
 *   responses:
 *     200:
 *       description: Password reset link sent
 *       content:
 *         application/json:
 *           example: { "message": "Password reset link sent to your email." }
 *     400:
 *       description: Bad request (invalid email format)
 *       content:
 *         application/json:
 *           example: { "error": "\"email\" must be a valid email" }
 *     404:
 *       description: User not found
 *       content:
 *         application/json:
 *           example: { "error": "User not found" }
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: { "error": "Internal Server Error" }
 */

router.post("/request-reset-password", sendRequestPasswordReset);

/**
 * @openapi
 * /auth/reset-password:
 *  post:
 *   summary: Resets user password
 *   tags: [auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: User's email
 *             token:
 *               type: string
 *               description: Password reset token
 *             password:
 *               type: string
 *               description: New user password
 *           required:
 *             - email
 *             - token
 *             - password
 *   responses:
 *     200:
 *       description: Password reset successful
 *       content:
 *         application/json:
 *           example: { "message": "Password has been reset successfully." }
 *     400:
 *       description: Bad request (invalid request body)
 *       content:
 *         application/json:
 *           example: { "error": "\"email\" must be a valid email" }
 *     401:
 *       description: Unauthorized (invalid or expired reset token)
 *       content:
 *         application/json:
 *           example: { "error": "Invalid or expired reset token" }
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example: { "error": "Internal Server Error" }
 */

router.post("/reset-password", resetPassword);

/**
 * @openapi
 * /auth/activate:
 *  post:
 *   summary: Activates user account
 *   tags: [auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             verificationToken:
 *               type: string
 *               description: Token used to activate the account
 *           required:
 *             - verificationToken
 *   responses:
 *     200:
 *       description: User account activated
 *       content:
 *         application/json:
 *           example:
 *             code: 200
 *             status: "SUCCESS"
 *             responseBody: "Email verified successfully. You can now log in."
 *     400:
 *       description: Bad request (invalid request body)
 *       content:
 *         application/json:
 *           example:
 *             code: 400
 *             status: "ERROR"
 *             responseBody: "Invalid verification token"
 *     401:
 *       description: Unauthorized (invalid or expired verification token)
 *       content:
 *         application/json:
 *           example:
 *             code: 401
 *             status: "ERROR"
 *             responseBody: "Invalid or expired verification token"
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           example:
 *             code: 500
 *             status: "ERROR"
 *             responseBody: "Internal Server Error"
 */
router.post("/activate", verifyEmail);

export { router };
