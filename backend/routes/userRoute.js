const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/avatars/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = req.body.user_name + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


const router = express.Router();

router.route("/register").post(upload.single('avatar'), registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;

// Swagger


/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - password
*       properties:
*         name:
*           type: string
*           maxLength: 30
*           minLength: 4
*           description: User name
*         email:
*           type: string
*           format: email
*           description: User email address
*         password:
*           type: string
*           minLength: 8
*           description: User password
*         avatar:
*           type: object
*           properties:
*             public_id:
*               type: string
*               description: Public ID of the user avatar
*             url:
*               type: string
*               description: URL of the user avatar
*           description: User avatar
*         role:
*           type: string
*           description: User role
*         createdAt:
*           type: string
*           format: date-time
*           description: Date and time when the user was created
*         resetPasswordToken:
*           type: string
*           description: Reset password token for the user
*         resetPasswordExpire:
*           type: string
*           format: date-time
*           description: Expiration time for the reset password token
*/



/**
 * @swagger
 * tags:
 *  name: User Routes
 *  description: User routes managing API's
 */

//USER REGISTER API
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body or missing required fields
 *       500:
 *         description: Internal server error
 */

//USER LOGIN API
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login user
 *     tags: [User Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

//USER LOGOUT API
/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "Logged Out"
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//FORGOT PASSWORD API
/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     summary: Send password reset email
 *     tags: [User Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body or missing required fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

//RESET PASSWORD API
/**
 * @swagger
 * /api/v1/password/reset/{token}:
 *   put:
 *     summary: Reset password
 *     tags: [Authentication Routes]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token received via email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 minLength: 6
 *               confirmPassword:
 *                 type: string
 *                 minLength: 6
 *             required:
 *               - password
 *               - confirmPassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid or expired token, password does not match
 *       500:
 *         description: Internal server error
 */

//GET USER DETAILS API
/**
 * @swagger
 * /api/v1/me:
 *   get:
 *     summary: Get user details
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//UPDATE USER PASSWORD API
/**
 * @swagger
 * /api/v1/password/update:
 *   put:
 *     summary: Update user password
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *               - confirmPassword
 *     responses:
 *       200:
 *         description: User password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request body or missing required fields, old password incorrect or passwords do not match
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//UPDATE USER PROFILE API
/**
 * @swagger
 * /api/v1/me/update:
 *   put:
 *     summary: Update user profile
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//GET ALL USER DATA - ADMIN API
/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//GET SINGLE USER DETAILS ADMIN API
/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   get:
 *     summary: Get a single user by ID (admin)
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

//UPDATE USER ROLE ADMIN API
/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   put:
 *     summary: Update user role (admin)
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - role
 *     responses:
 *       200:
 *         description: User details with updated role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid user ID or missing request body fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

//DELETE USER PROFILE ADMIN API
/**
 * @swagger
 * /api/v1/admin/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */