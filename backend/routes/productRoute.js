const express = require("express");
// const upload = require("../utils/multer");
const multer = require('multer');

// specify the directory to store uploaded files

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   limits: { fileSize: 100 * 1024 * 1024 }, // 1 Mb
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/avatars/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      req.body.user_name +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, getAdminProducts);


router
  .route("/admin/product/new")
  .put(isAuthenticatedUser, authorizeRoles("admin"), upload.single('avatar'), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;


// Swagger

/**
 * @swagger
 * tags:
 *  name: Product Routes
 *  description: Product routes managing API's
 */

//CREATE NEW PRODUCT ADMIN API
/**
 * @swagger 
 * /admin/product/new:
 *   post:
 *     summary: Create a new product
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productData:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   category:
 *                     type: string
 *             required:
 *               - productData
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/productSchema'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//GET ALL PRODUCTS API
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product Routes]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *                 productsCount:
 *                   type: integer
 *                 resultPerPage:
 *                   type: integer
 *                 filteredProductsCount:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

//GET ALL PRODUCTS ADMIN API
/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products (Admin)
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//GET ALL PRODUCT DETAILS
/**
 * @swagger 
 * /product/{id}:
 *   get:
 *     summary: Get product details
 *     tags: [Product Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/productSchema'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     statusCode:
 *                       type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     statusCode:
 *                       type: number
 */

//UPDATE PRODUCT ADMIN API
/**
 * @swagger 
 * /admin/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingInfo:
 *                 $ref: '#/components/schemas/ShippingInfo'
 *               orderItems:
 *                 $ref: '#/components/schemas/OrderItems'
 *               paymentInfo:
 *                 $ref: '#/components/schemas/PaymentInfo'
 *               itemsPrice:
 *                 type: number
 *               taxPrice:
 *                 type: number
 *               shippingPrice:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *             required:
 *               - shippingInfo
 *               - orderItems
 *               - paymentInfo
 *               - itemsPrice
 *               - taxPrice
 *               - shippingPrice
 *               - totalPrice
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/productSchema'
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

//DELETE PRODUCT ADMIN API
/**
 * @swagger 
 * /admin/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

//CREATE & UPDATE REVIEW API
/**
 * @swagger 
 * /review:
 *   put:
 *     summary: Create New Review or Update the review
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewData:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: number
 *                   comment:
 *                     type: string
 *                   productId:
 *                     type: string
 *             required:
 *               - rating
 *               - comment
 *               - productId
 *     responses:
 *       200:
 *         description: The review was successfully created/updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 rating:
 *                   type: string
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */


//GET ALL REVIEWS API
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews of a product
 *     tags: [Product Routes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to get the reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the specified product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/review'
 *       400:
 *         description: Invalid request, missing required query parameter
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

//DELETE REVIEW API
/**
 * @swagger
 * /reviews:
 *   delete:
 *     summary: Delete a review
 *     tags: [Product Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to which the review belongs
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 allProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/productSchema'
 *       400:
 *         description: Invalid request parameters
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */