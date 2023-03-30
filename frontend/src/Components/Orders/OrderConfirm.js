import React from "react";
import "./OrderConfirm.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CheckoutSteps from "./CheckouSteps";
import { useSelector } from "react-redux";

const OrderConfirm = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      <div className="order-conf-container">
        <div style={{ marginTop: "8em", backgroundColor: "#f4f4f5" }}>
          <CheckoutSteps activeStep={1} />
        </div>
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography style={{ color: "black", fontFamily:"Poppins", fontSize:"3rem" }}>Shipping info</Typography>
              <div className="confirmshippingAreaBox">
                <div className="before-p">
                  <p style={{fontSize:"1.5rem", fontFamily:"Poppins"}}>Name:</p>
                  <span style={{fontSize:"1.5rem", fontFamily:"Poppins", fontWeight:'300'}}>{user && user.name}</span>
                </div>
                <div>
                  <p style={{fontSize:"1.5rem", fontFamily:"Poppins"}}>Phone:</p>
                  <span style={{fontSize:"1.5rem", fontFamily:"Poppins", fontWeight:'300'}}>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p style={{fontSize:"1.5rem", fontFamily:"Poppins"}}>Address:</p>
                  <span style={{fontSize:"1.5rem", fontFamily:"Poppins", fontWeight:'300'}}>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography style={{ color: "black", fontFamily:"Poppins" }}>
                Your Cart Items:
              </Typography>
              <div className="confirmCartItemscontainer">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.id}>
                      <Link
                        to={`/product/${item.id}`}
                        style={{ color: "black" }}
                      >
                        {item.name.toUpperCase()}
                      </Link>{" "}
                      <span style={{fontFamily:"Poppins", fontSize:"1.2rem"}}>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b style={{fontFamily:"Poppins", fontSize:"1.5rem"}}>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className="orderSummary">
              <Typography style={{ color: "black", fontSize:"3rem", fontFamily:"Poppins"}}>Order summary</Typography>
              <div>
                <div>
                  <p style={{ color: "black", fontFamily:"Poppins", fontSize:"2.5rem" }}>Subtotal:</p>
                  <span style={{ color: "black", fontFamily:"Poppins", fontSize:"2rem" }}>₹{subtotal}</span>
                </div>
                <div>
                  <p style={{ color: "black", fontFamily:"Poppins", fontSize:"2.5rem" }}>Shipping Charges:</p>
                  <span style={{ color: "black", fontFamily:"Poppins", fontSize:"2rem" }}>₹{shippingCharges}</span>
                </div>
                <div>
                  <p style={{ color: "black", fontFamily:"Poppins", fontSize:"2.5rem" }}>GST:</p>
                  <span style={{ color: "black", fontFamily:"Poppins", fontSize:"2rem" }}>₹{tax}</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p style={{ color: "black", fontFamily:"Poppins", fontSize:"2.5rem" }}>
                  <b style={{ color: "black", fontFamily:"Poppins", fontSize:"2.5rem" }}>Total:</b>
                </p>
                <span style={{ color: "black", fontFamily:"Poppins", fontSize:"2rem" }}>₹{totalPrice}</span>
              </div>

              <button  onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirm;
