import React, { useState, useEffect } from "react";
import "./processOrder.css";
import { BsClipboardCheck } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { getAllOrders, updateOrder } from "../../Actions/Order";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const ProcessOrder = (props) => {

  const alert = useAlert();
  const navigate = useNavigate();
  const { user} = useSelector((state) => state.user);
  const {  isUpdated, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const orderItems = props.orderItems;
  var price = 0;
  const taxPrice = 200;
  const shippingPrice = 50;
  orderItems && orderItems.map((i) => (price = price + i.price));
  price = price + taxPrice + shippingPrice;
  const Address =
    props.shippingInfo &&
    props.shippingInfo.city.concat(
      ",",
      props.shippingInfo.state,
      ",",
      props.shippingInfo.country,
      ",",
      props.shippingInfo.pinCode
    );
  const [status, setStatus] = useState("Shipped")
  const onChangeHandler = (e) =>{
    // console.log(e.target.value);
    setStatus(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(props.id, status);
    if(props.id)
      dispatch(updateOrder(props.id, status))
  }
  const {togglePen} = props;
  useEffect(() => {
    if(isUpdated){
      alert.success("Update succesfull!")
      togglePen()
    }
    if(error){
      alert.error(error);
    }
    dispatch({type:"updateOrderReset"})
  }, [dispatch, alert, isUpdated, error, navigate, togglePen]);
  return (
    <>
      <div className="shippingDetails">
        <span>
          <FaShippingFast
            style={{
              fontSize: "2rem",
              marginRight: "10px",
            }}
          />
          Shipping Info
        </span>
      </div>
      <div className="processOrderContainer">
        <div className="shipingInfo">
          <div className="processHeading">
            <div>
              <h3>Delivery Address</h3>
            </div>
            <p className="details">Name: {user && user.name}</p>
            <p className="details">
              Phone: {props.shippingInfo && props.shippingInfo.phoneNo}
            </p>
            <p className="details">Address: {Address}</p>
          </div>
          <div className="processHeading">
            <h3>Payment</h3>
            <p className="details" style={{ color: "green" }}>
              PAID
            </p>
            <p className="details">Amount: ${price}</p>
          </div>
          <div className="processHeading">
            <h3>Order Status</h3>
            <p className="details" style={{ color: "red" }}>
              {props.status}
            </p>
          </div>
          <div className="processHeading">
            <h3>Order items:</h3>
            {orderItems &&
              orderItems.length > 0 &&
              orderItems.map((i) => (
                <div className="allOrderedProducts">
                  <img
                    src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8&w=1000&q=80"
                    alt="Dummy"
                  />
                  <div className="details">
                    {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                    <br></br>
                    <div style={{ display: "flex" }}>
                      <h6 style={{ marginTop: "0.55em" }}>Price : </h6>
                      <p>{i.quantity * i.price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="processOrder">
          <div className="processOrderForm">
            <form>
              <h2>Process order</h2>
              <div>
                <span>
                  <BsClipboardCheck />
                </span>
                <select onChange={onChangeHandler}>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button type="submit" onClick={onSubmitHandler}>Process</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
