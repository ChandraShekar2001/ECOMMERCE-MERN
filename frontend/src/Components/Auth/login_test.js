function authenticate(email, password) {
    // check if the username and password are valid
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // console.log(!email)
    if (!email) {
      return false;
    } else if (!regex.test(email)) {
      return false;
    }
    else if (!password) {
        return false;
    }
    else{
        return true;
    }
  }
  
  module.exports = {
    authenticate: authenticate
  };