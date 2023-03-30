import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  withCredentials: true,
};

export const createOrder = (order) => async (dispatch) => {
  // console.log(order);
  try {
    dispatch({ type: "createOrderRequest" });
    const url = `http://localhost:4000/api/v1/order/new`;
    const { data } = await axios.post(url, order, config);
    //  console.log(data);
    dispatch({
      type: "createOrderSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "myOrderRequest" });
    const url = `http://localhost:4000/api/v1/orders/me`;
    const { data } = await axios.get(url, config);

    console.log(data.orders);
    dispatch({
      type: "myOrderSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "myOrderFail",
      payload: error.message,
    });
  }
};

//All Orders admin

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "allOrdersRequest" });
    const url = `http://localhost:4000/api/v1/admin/orders`;
    const { data } = await axios.get(url, config);
    dispatch({
      type: "allOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "allOrdersFail",
      payload: error.message,
    });
  }
};

export const updateOrder = (id, status) => async (dispatch) => {
  console.log(status, id);
  try {
    dispatch({ type: "updateOrderRequest" });
    const url = `http://localhost:4000/api/v1/admin/order/${id}`;
    const { data } = await axios.put(url, {status}, {
      headers: {
        "Content-Type": "application/json",
      },
        withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "updateOrderSuccess",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "updateOrderFail",
      payload: error.message ? error.message : error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteOrderRequest" });
    // console.log(id);
    const url = `http://localhost:4000/api/v1/admin/order/${id}`;
    const { data } = await axios.delete(url, config);
    // console.log(data);
    dispatch({
      type: "deleteOrderSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload: error.message ? error.message : error.response.data.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getOrderRequest" });
    const url = `http://localhost:4000/api/v1/order/${id}`;
    const { data } = await axios.get(url, config);
    console.log(data);
    dispatch({
      type: "getOrderSuccess",
      payload: data.order,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "getOrderFail",
      payload: error.message,
    });
  }
};
