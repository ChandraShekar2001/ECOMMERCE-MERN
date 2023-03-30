import React from "react";
import "./AdminSideBar.css";
import {
  BsFillCartFill,
  BsFillCartPlusFill,
  BsFillStarFill,
  BsFillPersonFill,
  BsBoxSeam,
  BsGraphUp,
  BsList,
} from "react-icons/bs";
import { Outlet } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <>
      <div className="sideBarMainDiv">
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2>
              <label for="nav-toggle">
                <span>
                  <BsList style={{fontSize:"3.5rem"}}/>
                </span>
              </label>
              {/* <a href="/">
                <span className="eommerceHeading">Admin</span>
              </a> */}
            </h2>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/admin/dashboard" className="active" >
                  <span>
                    <BsGraphUp className="sidebar-options-logo" />
                  </span>
                  <span className="sidebar-options">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/admin/products" className="active">
                  <span>
                    <BsFillCartFill className="sidebar-options-logo"/>
                  </span>
                  <span className="sidebar-options">AllProducts</span>
                </a>
              </li>
              <li>
                <a href="/admin/product" className="active">
                  <span>
                    <BsFillCartPlusFill className="sidebar-options-logo"/>
                  </span>
                  <span className="sidebar-options">CreateProduct</span>
                </a>
              </li>
              <li>
                <a href="/admin/orders" className="active">
                  <span>
                    <BsBoxSeam className="sidebar-options-logo"/>
                  </span>
                  <span className="sidebar-options">Orders</span>
                </a>
              </li>
              <li>
                <a href="/admin/users" className="active">
                  <span>
                    <BsFillPersonFill className="sidebar-options-logo"/>
                  </span>
                  <span className="sidebar-options">Users</span>
                </a>
              </li>
              <li>
                <a href="/admin/reviews" className="active">
                  <span>
                    <BsFillStarFill className="sidebar-options-logo"/>
                  </span>
                  <span className="sidebar-options">Review</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
