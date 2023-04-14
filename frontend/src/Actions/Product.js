import axios from "../AxiosConfig";
import { getBaseUrl } from "../AxiosConfig";

export const productActions =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 1000000],
    category,
    ratings = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductsRequest" });
      let url;
      if (category)
        url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte] = ${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      else
        url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte] = ${price[1]}&ratings[gte]=${ratings}`;
      console.log(url);
      const { data } = await axios.get(url);
      console.log(data);
      dispatch({
        type: "getAllProductsSuccess",
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: "getAllProductsFail",
        paylaod: err.message,
      });
    }
  };

export const fetchSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "singleProductRequest" });
    let url = `/product/${id}`;
    const { data } = await axios.get(url);
    console.log("data from single product");
    console.log(data);
    dispatch({
      type: "setSingleProductSuccess",
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: "setSingleProductFail",
      payload: err.message,
    });
  }
};

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "adminProductRequest" });
    let url = "/admin/products";
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": getBaseUrl(),
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "adminProductRequestSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "adminProductRequestFail",
      payload: error.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  console.log(productData);
  try {

    dispatch({ type: "newProductRequest" });
    let url = "/admin/product/new";
    const { data } = await axios.put(
      url,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getBaseUrl(),
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: "newProductRequestSuccess",
      payload: data.products,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "newProductRequestFail",
      payload: error.message,
    });
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    // console.log(id,productData);
    dispatch({ type: "updateProductRequest" });
    let url = `/admin/product/${id}`;
    const { data } = await axios.put(
      url,

      productData,

      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: "updateProductSuccess",
      payload: data.allProducts,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "updateProductFail",
      payload: error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({ type: "deleteProductRequest" });
    const url = `/admin/product/${id}`;
    const { data } = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "deleteProductRequestSucess",
      // payload:data.message
      payload: data.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductRequestFail",
      payload: error.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  console.log(reviewData);
  try {
    dispatch({ type: "newReviewRequest" });
    const url = `/review`;
    const { data } = await axios.put(
      url,
      {
        reviewData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": getBaseUrl(),
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: "newReviewSuccess",
      payload: data.allProducts,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "newReviewFail",
      payload: error.message,
    });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "allReviewRequest" });
    const url = `/reviews?id=${id}`;
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": getBaseUrl(),
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "allReviewSuccess",
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: "allReviewFail",
      payload: error.message,
    });
  }
};

export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "deletReviewRequest" });
    const url = `/reviews?id=${reviewId}&productId=${productId}`;
    const { data } = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": getBaseUrl(),
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({
      type: "deleteReviewSuccess",
      payload: data.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "deleteReviewFail",
      payload: error,
    });
  }
};
