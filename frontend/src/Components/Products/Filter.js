import React, { useState } from "react";
import "./Product.css";
import { FaFilter } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { productActions } from "../../Actions/Product";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch()

  const priceFilterHandler = (e) =>{
    let pricesString = e.target.id.split(",")
    let pricesNum = [];
    pricesNum.push(Number(pricesString[0]));
    pricesNum.push(Number(pricesString[1]));
    dispatch(productActions("" , 1, pricesNum, "", 0));
  }

  return (
    <div className="filterMainDiv">
      <div className="category">
        <FaFilter className="filterSymbol"></FaFilter>
        <div className="filterName">Filters</div>
      </div>
      <div className="category">
        <div className="categoryName">Price</div>
        <div ></div>
      </div>
      <div >
        <input className="inputRadio" type="radio" name="price" id="5000, 10000" onClick={priceFilterHandler}></input>
        <label className="fontSize">₹ 5000 -₹ 10000</label>
        <br></br>
        <input className="inputRadio" type="radio" name="price" id="10000, 30000" onClick={priceFilterHandler}></input>
        <label className="fontSize">₹ 10000 -₹ 30000</label>
        <br></br>
        <input className="inputRadio" type="radio" name="price" id="30000,80000" onClick={priceFilterHandler}></input>
        <label className="fontSize">₹ 30000 -₹ 80000</label>
        <br></br>
        <input className="inputRadio" type="radio" name="price" id="80000, 100000" onClick={priceFilterHandler}></input>
        <label className="fontSize">₹ 80000 -₹ 100000</label>
        <br></br>
        <input className="inputRadio" type="radio" name="price" id="100000, 200000" onClick={priceFilterHandler}></input>
        <label className="fontSize">₹ 100000-₹ 200000</label>
        <br></br>
      </div>
      <div className="category">
        <div className="categoryName">Rating</div>
        <div></div>
      </div>
      <div  className="price">
        <input className="inputRadio" type="radio" name="rating" id="1"></input>
        <label >
          <AiFillStar />
          <AiFillStar/>
          <AiFillStar/>
          <AiFillStar/>
          <AiOutlineStar/> 

        </label>
        <br></br>
        <input className="inputRadio" type="radio" name="rating" id="2"></input>
        <label className="fontSize">
          <AiFillStar  />
          <AiFillStar/>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar /> 


        </label>
        <br></br>
        <input className="inputRadio" type="radio" name="rating" id="4"></input>
        <label>
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar/>
          <AiOutlineStar /> 


        </label>
        <br></br>
        <input className="inputRadio" type="radio" name="rating" id="5"></input>
        <label>
          <AiFillStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
          <AiOutlineStar />
        </label>
        <br></br>
      </div>
      <div className="category">
        <div className="categoryName">Availability</div>
      </div>
      <div >
        <input
          className="inputRadio"
          type="radio"
          name="availability"
          id="1"
        ></input>
        <label className="fontSize">show in stock only</label>
        <br></br>
      </div>
      <div className="category">
        <div className="categoryName">Sort price</div>
      </div>
      <div >
        <input
          className="inputRadio"
          type="radio"
          name="availability"
          id="1"
        ></input>
        <label className="fontSize">Low to High</label>
        <br></br>
        <input
          className="inputRadio"
          type="radio"
          name="availability"
          id="1"
        ></input>
        <label className="fontSize">High to Low</label>
      </div>
    </div>
  );
};

export default Filter;
