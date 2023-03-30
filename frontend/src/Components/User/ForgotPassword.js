import React,{useState,useEffect} from "react";
import "./ForgotPassword.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import { forgotPassword } from "../../Actions/User";
import { useDispatch,useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const {success}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  
  const onLoginHandler = () => {
    navigate("/");
  };

  const [email,setEmail]=useState("") 

  const onChangeEmailHandler=(e)=>{
    e.preventDefault();
    const name=e.target.name;
    const value=e.target.value;
    console.log(name,value);
    setEmail(value)
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault()
    dispatch(forgotPassword(email))
  }

useEffect(()=>{
  if(success){
    alert.success('Verification mail sent successfully')
  }
  dispatch({
    type:"resetPasswordReset"
  })
},[success,dispatch, alert])


  return (
    <div className="forgotMainDiv">
      <form>
        <div className="forgotName">Forgot Password</div>
        <div className="inputField">
          <span>
            <BsPersonFill />
          </span>
          <input placeholder="Username/Email" name="email" value={email} onChange={onChangeEmailHandler}></input>
        </div>
        <button className="forgotButton" onClick={onSubmitHandler}>Send verification mail</button>
      </form>
      <div className="goLoginDiv">
        <BsArrowLeftShort style={{ marginTop: "8.5%", fontSize:'1.5rem' }} />
        <p
          onClick={onLoginHandler}
          style={{
            marginTop: "8%",
            fontSize: "78%",
          }}
        >
          Go to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
