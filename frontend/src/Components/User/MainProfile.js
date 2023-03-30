import React from "react";
import "./Profile.css";
import { RiFolderUserFill } from "react-icons/ri";
import { BsFolderPlus } from "react-icons/bs";
import { BsWallet2 } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";

const MainProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myOrderHandler = () => {
    navigate("/myorders");
  };

  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  const onUpdateHandler = () => {
    navigate("/updatepassword");
  };

  return (
    <div className="contentDiv">
      <div className="contentPhoto">
        <div style={{ margin: "0 30%", textAlign:"center" }}>
          <div className="photoDiv">
            <img className="photoImageDiv" src={user && user.avatar.url} alt=""></img>
          </div>
        </div>

        <div style={{ margin: "0 auto", textAlign:"center" }}>
          <h5
            className="poppins"
            style={{ fontSize: "2.5rem" }}
          >
            {user && user.name}
          </h5>
        </div>

        <p
          className="poppins"
          style={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          joined on: {user && new Date(user.createdAt).getDate()+"/"+new Date(user.createdAt).getMonth() + "/" +new Date(user.createdAt).getFullYear()}
        </p>
      </div>
      <div className="contentDetails">
        <div className="myordersDiv">
          <BsFolderPlus
            style={{ fontSize: "2rem", marginTop: "4px", color: "#A5A5A5" }}
          />
          <div className="myOrderDivHover" onClick={myOrderHandler} >
            My orders
          </div>
        </div>
        <div className="myordersDiv">
          <BsWallet2
            style={{ fontSize: "2rem", marginTop: "4px", color: "#A5A5A5" }}
          />
          <div className="myOrderDivHover">Payments</div>
        </div>

        <div className="mystuffDiv">
          <RiFolderUserFill
            style={{ fontSize: "2rem", marginTop: "4px", color: "#A5A5A5" }}
          />
          <div className="myOrderDivHover">My stuff</div>
        </div>
        <div className="mystuffDiv">
          <RiLockPasswordLine
            style={{ fontSize: "2rem", marginTop: "4px", color: "#A5A5A5" }}
          />
          <div className="myOrderDivHover" onClick={onUpdateHandler}>
            Change password
          </div>
        </div>
        <div className="mystuffDiv">
          <BsPower
            style={{ fontSize: "2rem", marginTop: "4px", color: "red" }}
          />
          <div className="myOrderDivHover" onClick={logOutHandler}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
