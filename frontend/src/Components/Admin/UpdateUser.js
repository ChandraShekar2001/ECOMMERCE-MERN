import React, { useState, useEffect } from "react";
import "./dashBoardForms.css";
import {
  BsPersonFill,
  BsFillEnvelopeFill,
  BsFillPersonCheckFill,
} from "react-icons/bs";
import { updateUser } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";


const UpdateUser = (props) => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.user);

  const [details, setdetails] = useState({
    name: props.name,
    email: props.email,
    role: props.role,
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setdetails({
      ...details,
      [name]: value,
    });
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(props.id, details));
  };  

  const {togglePencil} = props;

  useEffect(() => {
    if (success) {
      alert.success("Update successful!");
      togglePencil();
    }
    if (error) {
      alert.error(error);
    }
    dispatch({ type: "updateUserReset" });
  }, [dispatch, success, error, alert, togglePencil]);

  return (
    <>
      <div className="formContainer">
        <div className="update-form-box">
          <h1>EDIT USER</h1>
          <form>
            <div className="input-group">
              <div className="input-field">
                <span>
                  <BsPersonFill />
                </span>
                <input
                  type="text"
                  placeholder="user name"
                  name="name"
                  value={details.name}
                  onChange={onChangeHandler}
                  disabled
                />
              </div>
              <div className="input-field">
                <span>
                  <BsFillEnvelopeFill />
                </span>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={details.email}
                  onChange={onChangeHandler}
                  disabled
                />
              </div>
              <div className="input-field selectOptionDiv">
                <span>
                  <BsFillPersonCheckFill />
                </span>

                <select
                  className="selectOption"
                  name="role"
                  value={details.role}
                  onChange={onChangeHandler}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="btn-field">
              <button type="button" onClick={onClickHandler}>
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
