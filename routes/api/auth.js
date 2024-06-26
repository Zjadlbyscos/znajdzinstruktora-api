import express from "express";
import { auth } from "../../middlewares/auth.js";

const router = express.Router();

import { register } from "../../controllers/auth/register.js";
import { login } from "../../controllers/auth/login.js";
import { current } from "../../controllers/auth/current.js";
import { logout } from "../../controllers/auth/logout.js";
import { changePassword } from "../../controllers/auth/changePassword.js";
import { sendRequestPasswordReset } from "../../controllers/auth/requestPasswordReset.js";

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
 *               description: Aktualne hasło użytkownika
 *             newPassword:
 *               type: string
 *               description: Nowe hasło, na które użytkownik chce zmienić
 *           required:
 *             - currentPassword
 *             - newPassword
 *   responses:
 *     200:
 *       description: Hasło zostało zmienione
 *       content:
 *         application/json:
 *           example: { "message": "Hasło zostało pomyślnie zmienione." }
 *     400:
 *       description: Nieprawidłowe żądanie (np. brak wymaganych pól, nieprawidłowe hasło)
 *       content:
 *         application/json:
 *           example: { "error": "\"currentPassword\" jest wymagane" }
 *     401:
 *       description: Nieautoryzowany (np. nieprawidłowy token JWT, niezgodność hasła)
 *       content:
 *         application/json:
 *           example: { "error": "Nieautoryzowany dostęp" }
 *     500:
 *       description: Błąd serwera wewnętrznego
 *       content:
 *         application/json:
 *           example: { "error": "Błąd serwera wewnętrznego" }
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
export { router };
