import React from "react";
import "./OrderSuccess.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <AiOutlineCheckCircle />

      <p style={{ color: "black" }}>Your Order has been Placed successfully </p>
      <Link
        to="/myorders"
        style={{
          fontSize: "1.3rem",
          fontStyle: "Poppins",
          fontSize: "1.5rem",
          borderRadius: "2em",
          backgroundColor: "#008000",
        }}
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
