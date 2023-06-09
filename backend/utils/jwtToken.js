// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {

  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    AcccessControlAllowCredentials: true,
    // AccessControlAllowOrigin: "http://localhost:3000"
  };
  // console.log(user);
  res.header("Access-Control-Allow-Credentials",true)
  res.header("Access-Control-Allow-Origin", "https://frontend-8vqw.onrender.com");
  res.status(201).cookie("token", token, options).json({
   
    success: true,
    // message: "password changed",
    user,
    token,
  });

 
};

module.exports = sendToken;
