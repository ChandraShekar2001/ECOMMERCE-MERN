const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");
const errorMiddleware = require("./middleware/error");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// app.use(cors())
// app.use(express.json());
// app.use(bodyParser. text({type: '/'}));

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


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors({ credentials: true, origin: "https://frontend-8vqw.onrender.com" }));
app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://frontend-8vqw.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Route Imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

// Swagger Documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'A simple API for Ecommerce web apps'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
// app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;


//SWAGER SCHEMAS
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
 * components:
 * 	schemas:
 * 		orderSchema:
 * 			type: object
 * 			required:
 * 			 - user
 * 			 - paidAt
 * 			 - itemsPrice
 * 			 - taxPrice
 * 			 - shippingPrice
 * 			 - totalPrice
 * 			 - orderStatus
 * 			properties:
 * 				shippingInfo:
 * 					$ref: '#/components/schemas/ShippingInfo'
 * 				orderItems:
 * 					$ref: '#/components/schemas/OrderItems'
 * 				user:
 * 					type: string
 * 					description: id of the user who ordered
 * 				paymentInfo:
 * 					$ref: '#/components/schemas/PaymentInfo'
 * 				paidAt:
 * 					type: string
 * 					format: date-time
 * 					description: the date at which payment was made
 * 				itemsPrice:
 * 					type: number
 * 					format: float
 * 					description: the cart subtotal without tax and shipping
 * 				taxPrice:
 * 					type: number
 * 					format: float
 * 					description: the tax applicable to the cart subtotal
 * 				shippingPrice:
 * 					type: number
 * 					format: float
 * 					description: the shipping price applicable to the delivery location
 * 				totalPrice:
 * 					type: number
 * 					format: float
 * 					description: the total value of the order
 * 				orderStatus:
 * 					type: string
 * 					description: the delivery status of the order
 * 				deliveredAt:
 * 					type: string
 * 					format: date-time
 * 					description: the delivery date of the order
 * 				createdAt:
 * 					type: string
 * 					format: float
 * 					description: the date at which the order was placed
 * 							
 * 		ShippingInfo:
 * 			type: object
 * 			required:
 * 			 - address
 *  			 - city
 *  			 - state
 *  			 - country
 *  			 - pinCode
 *  			 - phoneNo
 * 			properties:
 * 				address:
 * 					type: string
 * 					description: the delivery address
 * 					example: rve
 * 				city:
 * 					type: string
 * 					description: the city name in the delivery address
 * 					example: sv
 * 				state:
 * 					type: string
 * 					description: the state to be delivered to
 * 					example: 7
 * 				country:
 * 					type: string
 * 					description: country name for delivery
 * 					example: AT
 * 				pinCode:
 * 					type: integer
 * 					description: pin code for delivery
 * 					example: 9002
 * 				phoneNo:
 * 					type: integer
 * 					description: phone number for delivery
 * 					example: 2134567890
 * 
 * 		OrderItems:
 * 			type: array
 * 			items:
 * 				type: object
 * 				required:
 * 				 - name
 * 				 - price
 * 				 - quantity
 * 				 - id
 * 				properties:
 * 					name:
 * 						type: string
 * 						description: name of the item ordered
 * 						example: apple watch
 * 					price:
 * 						type: number
 * 						format: float
 * 						description: price of the item ordered
 * 						example: 3000
 * 					quantity:
 * 						type: integer
 * 						description: quantity of he item ordered
 * 						example: 2
 * 					id:
 * 						type: string
 * 						description: id of the item ordered in the database
 *
 *  		OrderItem:
 * 			type: object
 * 			required:
 * 			 - name
 * 			 - price
 * 			 - quantity
 * 			 - id
 * 			properties:
 * 				name:
 * 					type: string
 * 					description: name of the item ordered
 * 					example: apple watch
 * 				price:
 * 					type: number
 * 					format: float
 * 					description: price of the item ordered
 * 					example: 3000
 * 				quantity:
 * 					type: integer
 * 					description: quantity of he item ordered
 * 					example: 2
 * 				id:
 * 					type: string
 * 					description: id of the item ordered in the database
 *  
 * 		PaymentInfo:
 * 			type: object
 * 			required:
 * 			 - id
 * 			 - status
 * 			properties:
 * 				id: 
 * 					type: string
 * 					description: id of the payment
 * 				status: 
 * 					type: string
 * 					description: status of the payment
 */

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

