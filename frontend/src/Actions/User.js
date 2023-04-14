import axios from "../AxiosConfig";
import { getBaseUrl } from "../AxiosConfig";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": getBaseUrl(),
  },
  withCredentials: true,
};

export const loginUser = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    dispatch({
      type: "LoginRequest",
    });
 
    const url = "/login";
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": getBaseUrl(),
      },
      withCredentials: true,
    });

    dispatch({
      type: "LoginSuccess",
      payload: response.data.user,
    });
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({ type: "signUpReqest" });
    const url = "/register";
    const {data} = await axios.post(url, formData, config
    );
   console.log(data);
    dispatch({ type: "signUpSuccess", payload: data.user });
    localStorage.setItem("user", data.token);
  } catch (error) {
    console.log(error);
    dispatch({ type: "signUpFailure", payload: error.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get("/me",config);
    dispatch({
      type: "loadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "loadUserFailure",
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: "logOutRequest",
    });
    //eslint-disable-next-line
    const res = await axios.get("/logout", {
      withCredentials: true,
    });
    // console.log(res);
    dispatch({
      type: "logOutSuccess",
    });
  } catch (error) {
    dispatch({ type: "logOutFailure", payload: error.message });
  }
};

export const updateUserProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });
    const url = `/me/update`;
    const { data } = await axios.put(url, { name, email }, config);
    console.log(data);
    dispatch({
      type: "updateUserSuccess",
      payload: data
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload: error.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updatePasswordRequest" });
      const url = `/password/update`;
      const { data } = await axios.put(
        url,
        { oldPassword, newPassword, confirmPassword },
        config
      );
      console.log(data);
      dispatch({
        type: "updatePasswordSuccess",
      });
    } catch (error) {
      dispatch({
        type: "updatePasswordFail",
        payload: error.message ? error.response.data.message :error.message,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "forgotPasswordRequest" });
    const url = "/password/forgot";
    const { data } = await axios.post(url, {email}, config);
    console.log(data);
    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFail",
      payload: error.message,
    });
  }
};

export const resetPassword = (token,passwords) => async (dispatch) => {
  console.log(passwords);
  try {
    dispatch({ type: "resetPasswordRequest" });
    const url = `/password/reset/${token}`;
    const { data } = await axios.put(
      url,
      {
        password: passwords.password,
        confirmPassword: passwords.confirmPassword,
      },
      config
    );
    console.log(data);
    dispatch({
      type:"resetPasswordSuccess",
      payload:data.user
    })
  } catch (error) {
    console.log(error);
    dispatch({
      type:"resetPasswordFail",
      payload:error.message ? error.response.data.message : error.message
    })
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUserRequest" });
    const url = `/admin/users`;
    const { data } = await axios.get(url, config);
    console.log(data);
    dispatch({
      type: "getAllUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUserFail",
      payload: error.message,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRequest" });
    const url = `/admin/user/${id}`;
    const { data } = await axios.put(url, userData, config);
    // console.log(data);
    dispatch({
      type: "updateUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateUserFail",
      payload: error.message,
    });
  }
};

export const deleteuser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });
    const url = `/admin/user/${id}`;
    const { data } = await axios.delete(url, config);
    console.log(data);
    dispatch({
      type: "deleteUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.message,
    });
  }
};
