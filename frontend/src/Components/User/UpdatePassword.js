import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import { updatePassword } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainProfile from "./MainProfile";
const UpdatePassword = () => {
  const alert = useAlert();
  const { isUpdated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChangeUpdateHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const onClickUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword(
        password.oldPassword,
        password.newPassword,
        password.confirmNewPassword
      )
    );
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/profile");
      alert.success("Password changed successfully");
    }
    if (error) {
      alert.error(error);
    }
    dispatch({
      type: "updatePasswordReset",
    });
  }, [isUpdated, dispatch, error, navigate, alert]);

  return (
    <div className="update-main-container">
      <MainProfile />
      <div className="resetMainDiv">
        <form>
          <div className="resetName">Change Password</div>
          <div>
            <input
              className="oldPassDiv"
              placeholder="Old Password"
              name="oldPassword"
              type="password"
              onChange={onChangeUpdateHandler}
            ></input>
          </div>
          <div>
            <input
              className="newPassDiv"
              placeholder="New Password"
              name="newPassword"
              type="password"
              onChange={onChangeUpdateHandler}
            ></input>
          </div>
          <div>
            <input
              className="cnewPassDiv"
              placeholder="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              onChange={onChangeUpdateHandler}
            ></input>
          </div>
          <button className="resetButton" onClick={onClickUpdateHandler}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
