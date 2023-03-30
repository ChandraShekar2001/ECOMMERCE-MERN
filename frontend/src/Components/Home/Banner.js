import React from "react";
import classes from './Banner.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const Banner = () => {
  return (
    <>
    <div className={classes["banner-container"]}>
      <div className={classes["banner-heading"]}>REDMI NOTE 11T 5G</div>
      <div className={classes["banner-line"]}></div>

      <img src="/images/REdmi-note11.jpeg" alt="..."  className = {classes["banner-container-img"]} />
      <div>
        
      </div>
    </div>
    <div className={classes["banner-offer"]}>

      Robust Performance With MediaTek Dimensity 810 5G | 5000mah Long
      Lasting Battery

<br></br>
<br></br>
        {" "}
        Launch price: From{" "}
{" "}
        Rs.15,999

Sale ends at 12am

    </div>
  </>
  );
};

export default Banner;
