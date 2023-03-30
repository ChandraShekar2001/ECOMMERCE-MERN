import React, { useState, useEffect } from "react";
import "./dashBoardForms.css";
import {
  BsReceipt,
  BsCurrencyDollar,
  BsBarChartLine,
  BsJournalText,
  BsUiChecks,
} from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
import { getAdminProduct,updateProduct } from "../../Actions/Product";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
const UpdateProduct = (props) => {
  // const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
  const { success,error } = useSelector((state) => state.product);

  const [details, setDetails] = useState({
    name: props.name,
    price: props.price,
    description: props.description,
    category: props.category,
    Stock: props.Stock,
  });
  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(name,value);
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const onSubmitHandler=(e)=>{
    dispatch(updateProduct(props.id,details))
  }
  const {togglePen} = props
  useEffect(() => {
    if(success){
      alert.success("Details updated successfully")
      togglePen()
    }

    if(error){
      alert.error(error)
    }
    dispatch({type:"updateProductReset"})
    // navigate("/admin/products")
  
  }, [success,error,dispatch, alert, togglePen])


  
  

  return (
    <>
      <div className="formContainer">
        <div className="form-box">
          <h1>EDIT PRODUCT</h1>
          <form>
            <div className="input-group">
              <div className="input-field">
                <span>
                  <BsReceipt />
                </span>
                <input
                  type="text"
                  placeholder="product name"
                  name="name"
                  value={details.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="input-field">
                <span>
                  <BsCurrencyDollar />
                </span>
                <input
                  type="number"
                  placeholder="price"
                  name="price"
                  value={details.price}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="input-field">
                <span>
                  <BsJournalText />
                </span>
                <input
                  type="text"
                  placeholder="product description"
                  name="description"
                  value={details.description}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="input-field">
                <span>
                  <BsUiChecks />
                </span>
                <input
                  type="text"
                  placeholder="category"
                  name="category"
                  value={details.category}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="input-field">
                <span>
                  <BsBarChartLine />
                </span>
                <input
                  type="number"
                  placeholder="stock"
                  name="Stock"
                  value={details.Stock}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="btn-field">
              <button type="button" onClick={onSubmitHandler}>UPDATE</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
