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
 * tags:
 *  name: Order Routes
 *  description: Order routes managing API's
 */

//CREATE NEW ORDER API
/**
 * @swagger 
 * /order/new:
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
 * /order/{id}:
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
 * /orders/me:
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
 * /admin/orders:
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
 * /admin/order/{id}:
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
 * /admin/order/{id}:
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