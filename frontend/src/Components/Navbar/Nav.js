import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import GTruck from "../../../src/images/green truck.png";
import { FiSearch } from "react-icons/fi";
import Badge from "@material-ui/core/Badge";
import { FiShoppingCart } from "react-icons/fi";
import { BsFolderPlus } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../../Actions/User";
import { Link } from "react-router-dom";


const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  // var itemsNumber = 0;
  // cartItems = cartItems.map((i) => {
  //   itemsNumber = itemsNumber + i.quantity;
  // });
  const navigate = useNavigate();
  const myProfileHandler = () => {
    navigate("/profile");
  };

  const myOrdersHandler = () => {
    navigate("/myorderprofile");
  };
  const logOutHandler = () => {
    dispatch(logOut());
    navigate("/");
  };

  const gotoCartHandler = () => {
    navigate("/cart");
  };

  const gotoHomeHandler = () => {
    navigate("/");
  };

  const gotoDashboardHandler=()=>{
    navigate('/admin');
  }

  return (
    <>
      <div className="navMainDiv">
        <div className="nSymbol">
          <img className="nSymbolImage" src={GTruck} alt="imagesd" />
          <div className="nName" onClick = {() => navigate("/")}>Ecommerce</div>
        </div>
        <div className="nProducts"><Link to="/products/Laptop" className="nProducts">Laptops</Link></div>
        <div className="nProducts"><Link to="/products/Watch" className="nProducts">Watches</Link></div>
        <div className="nProducts"><Link to="/products/Tv" className="nProducts">Tv</Link></div>
        <div className="nProducts"><Link to="/products/Accessories" className="nProducts">Accessories</Link></div>
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "0.25em",
            height:"3.8rem"
          }}
        >
          <form className="nosubmit" style={{ display: "flex",color:"gray" }}>
            <FiSearch style={{ fontSize:"2rem", marginTop: "0.2em" }} />
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
            ></input>
          </form>
        </div>
        <div className="nProducts" onClick={gotoHomeHandler}>
          Home
        </div>
        <div className="nProducts">About</div>
        <div className="navlLogin">
          <button className="navLogin">
            <FaUserCircle style={{ color:"black", fontSize: "3.5rem" }} />
            <div className="dropdown-content-dis" style={{ padding:'0.3em'}}>
              <div className="dropDownDiv" onClick={myProfileHandler} >
                <CgProfile  style={{ fontSize: "2.5rem"}}/>
                <span style={{ paddingLeft: "0.5em", fontSize:"1.5rem" }}>Account</span>
              </div>
              <div className="dropDownDiv" onClick={myOrdersHandler} >
                <BsFolderPlus  style={{ color:"black", fontSize: "2.5rem" }}/>
                <span style={{ paddingLeft: "7px", color: "black", fontSize:"1.5rem" }} >Orders</span>
              </div>
              <div className="dropDownDiv"  >
                <BsPower style={{ color: "red", fontSize: "2.5rem" }} />
                <span style={{ paddingLeft: "7px" , color: "black", fontSize:"1.5rem"}} onClick={logOutHandler} >
                  Logout
                </span>
              </div>
              {user && user.role === "admin" && (
                <div className="dropDownDiv">
                  <MdDashboard  style={{ color:"black", fontSize: "2.5rem" }}/>
                  <span style={{ paddingLeft: "7px", color: "black", fontSize:"1.5rem" }} onClick={gotoDashboardHandler}>Dashboard</span>
                </div>
              )}
            </div>
          </button>
        </div>
        <div
          style={{ marginRight: "1%", cursor: "pointer" }}
          onClick={gotoCartHandler}
        >
          {cartItems.length > 0 ? (
            <Badge color="secondary" badgeContent={cartItems.length}>
              {/* <ShoppingCartIcon />{" "} */}
              <FiShoppingCart style={{fontSize:"3.5rem" }} />
            </Badge>
          ) : (
            <Badge color="secondary" badgeContent={"0"}>
              {/* <ShoppingCartIcon />{" "} */}
              <FiShoppingCart style={{ fontSize:"3rem" }} />
            </Badge>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
