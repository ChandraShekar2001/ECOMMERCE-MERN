import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";
import { resetPassword } from "../../Actions/User";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";


const ResetPassword = () => {
  const alert = useAlert();
  const { success, error} = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  const [pass, setPass] = useState({
    password: "",
    confirmpassword: "",
  });

  const onChangeResethandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setPass({
      ...pass,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword(params.token, {
        password: pass.password,
        confirmPassword: pass.confirmpassword,
      })
    );
    // console.log(pass);
  };
  useEffect(() => {
    if (success) {
      alert.success("Reset password successful");
    }
    if(error){
      alert.error(error)
    }
    dispatch({type:"resetPasswordReset"})
  }, [dispatch, error, success, alert])
  

  return (
    <div className="Resetmaincontainer">
      <form>
      <div><h5>Reset password</h5></div>
        <div className="forgot-new-password">
        <label>New password</label><br></br>
        <input type="password" placeholder="New Password" name="password" onChange={onChangeResethandler}/>
        </div>
        <div className="forgot-new-password">
        <label>Confirm password</label><br></br>
        <input type="password" placeholder="Confirm Password" name="confirmpassword" onChange={onChangeResethandler}/>
        </div>
        <button onClick={onSubmitHandler}>Submit</button>
        
      </form>
     </div>
  );
};

export default ResetPassword;
