import React, { useEffect } from "react";
import "./MyOrders.css";
import MainProfile from "../User/MainProfile";
import { BsCircleFill } from "react-icons/bs";
import { myOrders } from "../../Actions/Order";
import { useDispatch, useSelector } from "react-redux";
const MyOrder = () => {
  const dispatch = useDispatch();
  const {orders} = useSelector((state) => state.order);
  //   console.log(user._id);

  console.log(orders);
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <div className="myOrderMainDiv">
      <MainProfile />
      <div className="myOrderDispalyDiv">
        <div className="myOrderNameDiv">All orders</div>
        {orders.length > 0 && orders.map(order =>
             <div className="myOrderContentDisplay">
              <div className="myOrderPhotoDiv">
                <img
                  className="myOrderImageDiv"
                  src="https://image01.realme.net/general/20200525/1590396462498.jpg.webp"
                  alt=""
                />
              </div>
              <div className="myOrderProductDiv">
                <p>{order.name}</p>
              </div>
              <div className="myOrderPriceDiv">
                <p>${order.price}</p>
              </div>
              <div className="myOrderStatusDiv">
                <BsCircleFill className="circlefill" />
                <p>Processing</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default MyOrder;
