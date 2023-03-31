const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;


// Swagger

/**
 * @swagger
 * components:
 *  schemas:
 *    shippingInfo:
 *      type: object
 *      required:
 *        - address
 *        - city
 *        - state
 *        - country
 *        - pinCode
 *        - phoneNo
 *      properties:
 *        address:
 *          type: string
 *          description: the delivery address
 *          example: rve
 *        city:
 *          type: string
 *          description: the city name in the delivery address
 *          example: sv
 *        state:
 *          type: string
 *          description: the state to be delivered to
 *          example: 7
 *        country:
 *          type: string
 *          description: country name for delivery
 *          example: AT
 *        pinCode:
 *          type: integer
 *          description: pin code for delivery
 *          example: 9002
 *        phoneNo:
 *          type: integer
 *          description: phone number for delivery
 *          example: 1234567890
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    OrderItems:
 *      type: array
 *      items:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - quantity
 *          - id
 *        properties:
 *          name:
 *            type: string
 *            description: name of the item ordered
 *            example: apple watch
 *          price:
 *            type: number
 *            format: float
 *            description: price of the item ordered
 *            example: 3000
 *          quantity:
 *            type: integer
 *            description: quantity of he item ordered
 *            example: 2
 *          id:
 *            type: string
 *            description: id of the item ordered in the database
 *            example: 6333e753876de9e542e4c5f6
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PaymentInfo:
 *      type: object
 *      required:
 *        - id
 *        - status
 *      properties:
 *        id:
 *          type: string
 *          description: id of the payment
 *          example: samplePayment
 *        status:
 *          type: string
 *          description: status of the payment
 *          example: succeded
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    orderSchema:
 *       type: object
 *       required:
 *        - user
 *        - paidAt
 *        - itemsPrice
 *        - taxPrice
 *        - shippingPrice
 *        - totalPrice
 *        - orderStatus
 *       properties:
 *         shippingInfo:
 *           $ref: '#/components/schemas/shippingInfo'
 *         orderItems:
 *           $ref: '#/components/schemas/OrderItems'
 *         user:
 *           type: string
 *           description: id of the user who ordered
 *           example: 6333e62bdb05cc1a2fec7f56
 *         paymentInfo:
 *           $ref: '#/components/schemas/PaymentInfo'
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: the date at which payment was made
 *           example: 2022-10-07T19:27:03.855+00:00
 *         itemsPrice:
 *           type: number
 *           format: float
 *           description: the cart subtotal without tax and shipping
 *           example: 9000
 *         taxPrice:
 *           type: number
 *           format: float
 *           description: the tax applicable to the cart subtotal
 *           example: 1620
 *         shippingPrice:
 *           type: number
 *           format: float
 *           description: the shipping price applicable to the delivery location
 *           example: 0
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: the total value of the order
 *           example: 10620
 *         orderStatus:
 *           type: string
 *           description: the delivery status of the order
 *           example: Shipped
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           description: the delivery date of the order
 *         createdAt:
 *           type: string
 *           format: float
 *           description: the date at which the order was placed
 *           example: 2022-10-07T19:27:03.862+00:00
 *
 *
 *
 *    OrderItem:
 *       type: object
 *       required:
 *        - name
 *        - price
 *        - quantity
 *        - id
 *       properties:
 *         name:
 *           type: string
 *           description: name of the item ordered
 *           example: apple watch
 *         price:
 *           type: number
 *           format: float
 *           description: price of the item ordered
 *           example: 3000
 *         quantity:
 *           type: integer
 *           description: quantity of he item ordered
 *           example: 2
 *         id:
 *           type: string
 *           description: id of the item ordered in the database
 *           example: 6333e753876de9e542e4c5f6
 *
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     productSchema:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - category
 *         - Stock
 *         - user
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         ratings:
 *           type: number
 *           description: Product ratings
 *         category:
 *           type: string
 *           description: Category of the product
 *         Stock:
 *           type: number
 *           description: Product stock
 *         numOfReviews:
 *           type: number
 *           description: Number of reviews for the product
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/review'
 *         user:
 *           type: string
 *           description: ID of the user who added the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the product was created
 *
 *     review:
 *       type: object
 *       required:
 *         - user
 *         - name
 *         - rating
 *         - comment
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who posted the review
 *         name:
 *           type: string
 *           description: Name of the user who posted the review
 *         rating:
 *           type: number
 *           description: Rating given by the user
 *         comment:
 *           type: string
 *           description: Comment posted by the user
 */


/**
 * @swagger
 * tags:
 *  name: Order Routes
 *  description: Order routes managing API's
 */

//CREATE NEW ORDER API
/**
 * @swagger
 * /api/v1/order/new:
 *   post:
 *     summary: Create a new order
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingInfo:
 *                 $ref: '#/components/schemas/shippingInfo'
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
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order:
 *                   $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//FIND ORDER BY ID API
/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           example: 6340fcde0d157ec75c2bfca9
 *     responses:
 *       200:
 *         description: The order was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order:
 *                   $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Invalid order ID
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: Order not found with the specified ID
 *       500:
 *         description: Internal server error
 */

//SHOW ORDERS OF CURRENT USER API
/**
 * @swagger
 * /api/v1/orders/me:
 *   get:
 *     summary: Get logged in user orders
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns orders of the logged in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   $ref: '#/components/schemas/OrderItems'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//SHOW ALL ORDERS TO ADMIN API
/**
 * @swagger
 * /api/v1/admin/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: Keyword to search in order information
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number to return
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Maximum number of orders to return per page
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 totalOrders:
 *                   type: integer
 *                 totalAmount:
 *                   type: number
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/orderSchema'
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       500:
 *         description: Internal server error
 */

//UPDATE ORDER STATUS ADMIN API
/**
 * @swagger
 * /api/v1/admin/order/{id}:
 *   put:
 *     summary: Update Order Status
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 6340fcde0d157ec75c2bfca9
 *         required: true
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Shipped, Delivered]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: The order status was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 changedOrder:
 *                   $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Invalid request body or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: Order not found with this Id
 *       500:
 *         description: Internal server error
 */

//DELETE ORDER ADMIN API
/**
 * @swagger
 * /api/v1/admin/order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Order Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: The order was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/orderSchema'
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access, token missing or invalid
 *       404:
 *         description: The order with the given ID was not found
 *       500:
 *         description: Internal server error
 */