import React, { useState, useEffect } from "react";
import "./tables.css";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { getAllOrders, deleteOrder } from "../../Actions/Order";
import { useDispatch, useSelector } from "react-redux";
import ProcessOrder from "./ProcessOrder";
import { useAlert } from "react-alert";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { orders, loading, isDeleted, error, isUpdated } = useSelector(
    (state) => state.order
  );
  // console.log(orders);
  const [pen, setPen] = useState(false);
  const [details, setDetails] = useState();
  const onClickHandler = (i) => {
    setDetails(i);
    if (i.orderStatus !== "Delivered") setPen(true);
  };

  const setPenHandler = () => setPen(false);
  useEffect(() => {
    if (isDeleted) {
      alert.success("Deleted order successfully!");
    }
    if (error) {
      alert.error(error);
    }
    dispatch({ type: "deleteOrderReset" });
    dispatch(getAllOrders());
  }, [dispatch, alert, isDeleted, error, isUpdated]);
  return (
    <>
      {!pen ? (
        <div className="tableContainer">
          <div className="table-box">
            <h1>Orders List</h1>
            <table>
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Items Quantity</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </tbody>
              <tbody>
                {!loading &&
                  orders.map((i) => (
                    <tr>
                      <td>{i._id}</td>
                      <td
                        style={{
                          color:
                            i.orderStatus === "Delivered"
                              ? "#008000"
                              : i.orderStatus === "Shipped"
                              ? "blue"
                              : "red",
                        }}
                      >
                        {i.orderStatus.toUpperCase()}
                      </td>
                      <td>{i.orderItems.length}</td>
                      <td>{i.totalPrice}</td>
                      <td>
                        <span className="tableIcons">
                          <BsPencilFill
                            style={{ fontSize: "1.8rem" }}
                            onClick={() => onClickHandler(i)}
                          />
                        </span>
                        <span className="tableIcons">
                          <BsTrash
                            style={{ fontSize: "1.8rem" }}
                            onClick={() => dispatch(deleteOrder(i._id))}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <ProcessOrder
          key={details._id}
          shippingInfo={details && details.shippingInfo}
          orderItems={details && details.orderItems}
          status={details && details.orderStatus}
          amount={details && details.totalPrice}
          id={details && details._id}
          togglePen={setPenHandler}
        />
      )}
    </>
  );
};

export default OrderList;
