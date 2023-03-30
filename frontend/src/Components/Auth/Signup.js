import React, { useState, useEffect } from "react";
import { registerUser } from "../../Actions/User";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { BsFillKeyFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import "./Signup.css";
const Signup = () => {
  const { error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // const onChangeHandler = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   console.log(name, value);
  //   setUser({
  //     ...user,
  //     [name]: value,
  //   });
  // };
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    // console.log(name);
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    // console.log(avatar);
    console.log(myForm);
    dispatch(registerUser({ name, email, password, avatar }));
    // console.log(user.name);
    // dispatch(registerUser(myForm));
  };

  const onChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      window.alert(error);
    }
    if (success) {
      navigate("/");
    }
    dispatch({ type: "signUpClearErrors" });
  }, [error, success, navigate, dispatch]);

  return (
    <div className="signupMainDiv">
      <form method="POST" encType="multipart/form-data">
        <div className="signupName">Sign Up</div>
        <div className="googleName">
          <FcGoogle style={{ fontSize: "35px" }}></FcGoogle>
          <div
            style={{ paddingLeft: "8%", fontSize: "80%", fontWeight: "500" }}
          >
            Signup with Google
          </div>
        </div>
        <div className="facebookName">
          <BsFacebook
            style={{ fontSize: "35px", color: "#3b5998" }}
          ></BsFacebook>
          <div
            style={{ paddingLeft: "8%", fontSize: "80%", fontWeight: "500" }}
          >
            Signup with Facebook
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
        <div className="sign-up-inputField">
          <span>
            <FaUserAlt style={{ fontSize: "1.5rem", margin: "1em" }} />
          </span>
          <input
            name="name"
            // className="emailDiv"
            placeholder="Username"
            type="text"
            value={user.name}
            onChange={onChangeHandler}
          ></input>
        </div>
        <div className="sign-up-inputField">
          <span>
            <MdEmail style={{ fontSize: "1.5rem", margin: "1em" }} />
          </span>
          <input
            name="email"
            // className="emailDiv"
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={onChangeHandler}
            // style={{ marginTop: "5%" }}
          ></input>
        </div>
        <div className="sign-up-inputField">
          <span>
            <BsFillKeyFill style={{ fontSize: "1.5rem", margin: "1em" }} />
          </span>
          <input
            name="password"
            // className="passwordDiv"
            placeholder="Password"
            onChange={onChangeHandler}
            // style={{ marginTop: "5%" }}
            type="password"
            value={user.password}
          ></input>
        </div>
        <div className="sign-up-inputField">
          <span>
            <BsFillKeyFill style={{ fontSize: "1.5rem", margin: "1em" }} />
          </span>
          <input
            name="confirmpassword"
            // className="passwordDiv"
            placeholder="Confirm Password"
            onChange={onChangeHandler}
            // style={{ marginTop: "5%" }}
            type="password"
            value={user.confirmpassword}
          ></input>
        </div>
        <div className="sign-up-inputField">
          <span>
            <CgProfile style={{ fontSize: "1.5rem", margin: "1em" }} />
          </span>
          <input
            name="avatar"
            // className="passwordDiv"
            placeholder="Choost Avatar"
            onChange={onChangeHandler}
            // style={{ marginTop: "5%" }}
            type="file"
            // value={user.confirmpassword}
          ></input>
        </div>
        <button
          className="signupButton"
          onClick={registerSubmit}
          style={{ marginTop: "5%" }}
        >
          Signup
        </button>
        <div className="signupPolicy">
          By signing up you accept our Privacy Policy, Terms & Licensing
          Agreement. Protected by reCAPTCHA. Google Privacy Policy & Terms
          apply.
        </div>
      </form>
    </div>
  );
};

export default Signup;
