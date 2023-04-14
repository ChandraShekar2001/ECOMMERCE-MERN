import React from "react";
import "./Card.css";
import { BsStarFill, BsCart } from "react-icons/bs";
import {addItem} from "../../Actions/Cart"
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
const Card = (props) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const addItemsToCartHandler = () => {
    dispatch(addItem(props.id, 1))
    alert.success("Item added to cart")
    // console.log(props.id);
  }

  return (
      <div class="card-main" >
        <div className="imgCardDiv" style={{ width: "20rem", height: "20rem" }}>
          <img
            src={props.images[1].url}
            class="card-img-top"
            style={{ height: "100%", width: "100%", objectFit:"cover" }}
            alt="Product"
          />
        </div>
        <div className="rating-card">
          <div>
            <p style={{marginTop:"0.1em"}}>{props.rating}</p>
          </div>
          <div>
            <p>
              <BsStarFill style={{ background: "rgba(241, 243, 245, 0)" }} />
            </p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p style={{marginTop:"0.15em"}}>{props.reviews}</p>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h5>
          <button className="addToCartBtn" onClick={addItemsToCartHandler}>
            <BsCart style={{ marginRight: "0.3rem", fontSize:'1.5rem', marginBottom:"0.3em" }}  />
            Add To Cart
          </button>
          <h6>
            Rs. {props.price}{" "}
            <span>
              <s>{1.4*props.price}</s>
            </span>
            <span className="offerPercent"> (40% OFF)</span>
          </h6>
        </div>
      </div>
  );
};

export default Card;
