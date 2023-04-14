import React from 'react';
import background from '../../images/contactus.jpg';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="container">
      <div className="contactusForm">
        <form>
          <legend className="titleOfForm">Contact Us</legend>
          <div class="mb-5">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-5">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </div>
  );
}

export default ContactUs
