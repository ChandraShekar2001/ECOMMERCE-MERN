import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from 'react-alert'
import {FcGoogle} from 'react-icons/fc'
import {BsFacebook} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import {  BsFillKeyFill} from 'react-icons/bs'
import {  FaUserAlt} from 'react-icons/fa'


import "./Login.css";

import { loginUser } from "../../Actions/User";

const Login = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();

  const {error} = useSelector(state => state.user)

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };

  const onForgotHandler=()=>{
    navigate("/forgotpassword")
  }

  const onSignupHandler=()=>{
    navigate("/signup")
  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch({
        type:'clearErrors'
      })
    }

  }, [error, dispatch, alert])


  

  return (
    <div className="loginMainDiv">
    <form onSubmit={onSubmitHandler}>
      <div className="loginName">Log In </div>
      <div className="googleName">
        <FcGoogle style={{ fontSize: "3.5rem" }}></FcGoogle>
        <div
          style={{ paddingLeft: "8%", fontSize: "1.5rem", fontWeight: "500" }}
        >
          Login with Google
        </div>
      </div>
      <div className="facebookName">
        <BsFacebook
          style={{ fontSize: "3.5rem", color: "#3b5998" }}
        ></BsFacebook>
        <div
          style={{ paddingLeft: "8%", fontSize: "1.5rem", fontWeight: "500" }}
        >
          Login with Facebook
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "3%" }}>
        <div className="orLine"></div>
        <div
          style={{
            color: "rgb(186, 186, 186)",
            paddingLeft: "3%",
            paddingRight: "2%",
          }}
        >
          or
        </div>
        <div className="orLine"></div>
      </div>
      <div className="InputField">
        <span>
          <FaUserAlt style={{fontSize:"1.5rem", margin:"1em"}}/>
        </span>
        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          placeholder="Email"
          style={{width:"100%", height:"4rem", border:'none'}}
          required
        ></input>
      </div>
      <div className="InputField" style={{marginTop: "10%"}}>
        <span>
        <BsFillKeyFill style={{fontSize:"1.5rem", margin:"1em"}}/>
        </span>
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChangeHandler}
          required
          style={{width:"100%", height:"4rem", border:'none'}}
        ></input>
      </div>
      <button className="loginButton" style={{ marginTop: "10%" }}>
        LogIn
      </button>
      <div className="loginPolicy">
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </div>
      <div className="forgotDiv" onClick={onForgotHandler} >Forgot Your Password?</div>
      <div className="createDiv" onClick={onSignupHandler}>Create an Account</div>
    </form>
  </div>
  );
};

export default Login;
