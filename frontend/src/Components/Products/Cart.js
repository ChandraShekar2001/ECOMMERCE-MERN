import React from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { RxPlus } from "react-icons/rx";
import { RxMinus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../Actions/Cart";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const incrementHandler = (id) => {
    dispatch(addItem(id, 1));
  };
  const decrementHandler = (id) => {
    dispatch(removeItem(id));
  };

  var total= cartItems.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue.price*currentValue.quantity;
  }, 0);
  

  const shippingCost=30;

  return (
    <>
    <div className="myCartMainDiv">
    {cartItems.length >0?
      <div className="myCartContentDiplay">
      <div className="myCartNameDiv">
        <FiShoppingCart style={{ paddingBottom: "0.6rem",fontSize:"3rem" }} />
        <span style={{ marginLeft: "1%", fontSize:"3rem"}}>Cart items</span>
      </div>
      <div className="myCartContentDiv">
        <div className="myCartProductDiv">
          <div className="myCartProductDescription">
            <div className="myCartProductProducts">Products</div>
            <div className="myCartProductQuantity">Quantity</div>
            <div className="myCartProductPrice">Price</div>
          </div>
          {cartItems.map((i) => (
            <div className="myCartProducts">
              <div className="myCartContentDisplay">
                <div className="myCartPhotoDiv">
                  <img
                    className="myCartImageDiv"
                    src={i.images[0].url}
                    alt=""
                  />
                </div>
                <div className="myCartProductDiv">
                  <p style={{ marginTop: "24%", fontSize: "90%" }}>
                    {i.name}
                  </p>
                </div>
                <div className="myCartStatusDiv">
                  <div className="quantityDiv">
                    <div
                      className="quantityPlus"
                      onClick={() => decrementHandler(i.id)}
                    >
                      <RxMinus />
                    </div>
                    <div className="quantitynumber">{i.quantity}</div>
                    <div
                      className="quantityminus"
                      onClick={() => incrementHandler(i.id, i.quantity)}
                    >
                      <RxPlus />
                    </div>
                  </div>
                </div>
                <div className="myCartPriceDiv">
                  <p style={{ marginTop: "5px", fontSize: "90%" }}>
                    ${i.quantity * i.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="myCartSummaryDiv">
          <div className="myCartSummaryName">Payment details</div>
          <div className="myCartSummaryDetails">
          <p className="payment-box-labels">
              Total cost 
              <span className="moneySpan">${total}</span>
            </p>
            <p className="payment-box-labels">
              Shipping cost 
              <span className="moneySpan">${0.18*total}</span>
            </p>
          </div>
          <div className="myCartSummaryTotal">
            <p className="payment-box-labels">
              Total price  
              <span className="moneySpanTotal">${1.18*total}</span>
            </p>
          </div>
          <div className="myCartCheckOut">
            <p onClick = {() => navigate("/shipping")}>Checkout</p>
          </div>
        </div>
      </div>

    </div>
      :
      <h1>No items in cart</h1>
      
      }
     
    </div>
    {/* <Afooter/> */}
    </>

  );
};


export default Cart;
