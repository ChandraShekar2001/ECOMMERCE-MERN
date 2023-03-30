import React, { useState, useEffect } from "react";
import "./Profile.css";
import MainProfile from "./MainProfile";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Actions/User";

import { useAlert } from "react-alert";
const Profile = () => {
  const alert = useAlert();
  const { user, isUpdated } = useSelector((state) => state.user);
  const [edit1, setEdit1] = useState("Edit");
  const [isDisabled1, setIsDisabled1] = useState(true);
  const [showButton1, setShowButton1] = useState("noShowButton");

  const editPerInfoHandler = (e) => {
    e.preventDefault();
    if (edit1 === "Edit") {
      setEdit1("Cancel");
      setIsDisabled1(false);
      setShowButton1("showButton");
    }
    if (edit1 === "Cancel") {
      setEdit1("Edit");
      setIsDisabled1(true);
      setShowButton1("noShowButton");
    }
  };


  const [details, setDetails] = useState({
    name: user && user.name,
    email: user && user.email,
  });
  const dispatch = useDispatch();

  // console.log(user);

  const onChangeNameEmailHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const onSubmitSaveHandler = () => {
    dispatch(updateUserProfile(details.name, details.email));
    // window.alert("information updated successfully");
    setEdit1("Edit");
    setIsDisabled1(true);
    setShowButton1("noShowButton");
    window.location.reload()
  };

  useEffect(() => {
    if (isUpdated) {
      alert.success("Updated successfully!");
      dispatch({ type: "updateUserReset" });
    }
  }, [isUpdated, alert, dispatch]);

  return (
    <div className="main-container">
      <MainProfile />
      <div className="profileMainDiv">
        <div className="contentDisplay" style={{ backgroundColor: "#fff" }}>
          <div className="perInfoDiv" style={{ marginLeft: "3%" }}>
            <span
              style={{
                fontSize: "2.5rem",
              }}
            >
              Personal information
            </span>
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                marginLeft: "8%",
                fontSize: "1.5rem",
              }}
              onClick={editPerInfoHandler}
            >
              {edit1}
            </span>
            <br></br>
            <div className="nameDiv">
              <input
                className="inputNameDiv"
                // placeholder={user.name}
                value={details.name}
                type="text"
                disabled={isDisabled1}
                name="name"
                onChange={onChangeNameEmailHandler}
              ></input>
            </div>

            <br></br>
            <span style={{ fontSize: "1.8rem" }}>Date of birth</span>
            <br></br>
            <div className="nameDiv">
              <input
                className="inputNameDiv"
                placeholder="08/08/2002"
                disabled
              ></input>
            </div>
            <br></br>
            <span style={{ fontSize: "1.8rem" }}>Your gender</span>
            <br></br>
            <div className="nameDiv">
              <input type="radio" name="person" disabled checked={true}></input>
              <span>Male</span>
              <input
                style={{ marginLeft: "3%" }}
                type="radio"
                name="person"
                disabled
              ></input>
              <span>Female</span>
            </div>
          </div>
          <div
            style={{
              backgrounColor: "2px solid green",
              marginTop: "3%",
              marginLeft: "3%",
            }}
          >
            <span
              style={{
                fontSize: "1.8rem",
              }}
            >
              Email address
            </span>
            <br></br>
            <div className="nameDiv">
              <input
                className="inputNameDiv"
                type="email"
                value={details.email}
                disabled={isDisabled1}
                name="email"
                onChange={onChangeNameEmailHandler}
              ></input>
            </div>
          </div>
          <div
            style={{
              backgrounColor: "2px solid green",
              marginTop: "3%",
              marginLeft: "3%",
            }}
          >
            <span
              style={{
                fontSize: "1.8rem",
              }}
            >
              Phone number
            </span>
            <br></br>
            <div className="nameDiv">
              <input
                className="inputNameDiv"
                type="number"
                placeholder="9848356709"
                disabled={isDisabled1}
              ></input>
            </div>
            <div className={showButton1}>
              <button
                className="perButtonDiv perButtonDivPhone"
                type="submit"
                onClick={onSubmitSaveHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
