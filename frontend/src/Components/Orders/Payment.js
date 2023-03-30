import React, { Fragment, useRef } from "react";
import CheckoutSteps from "./CheckouSteps";
import { useSelector, useDispatch } from "react-redux";

import "./Payment.css";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsCalendar4Event } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { createOrder } from "../../Actions/Order";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // console.log(shippingInfo);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: "samplePayment",
      status: "succeded",
    },
  };

  const submitHandler = async (e) => {
    dispatch(createOrder(order));

    navigate("/success");
  };

  return (
    <Fragment>
      <div className="payment-main-container">
        <div style={{ marginTop: "5%", font: "Poppins" }}>
          <CheckoutSteps activeStep={2} />
        </div>
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <p style={{}}>Card Info</p>
            <div className="paymentInput">
              <AiOutlineCreditCard />
              <input type="number" />
            </div>
            <div className="paymentInput">
              <BsCalendar4Event />
              <input type="number" />
            </div>
            <div className="paymentInput">
              <MdVpnKey />
              <input type="number" />
            </div>

            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
              ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
