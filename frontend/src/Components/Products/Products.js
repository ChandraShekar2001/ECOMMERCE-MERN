import React, { useEffect, useState } from "react";
import "./Product.css";
import "./display2.css";
import ProductCard from "./Card";
import { FaFilter } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../Actions/Product";
import { useParams, Link } from "react-router-dom";

const Products = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;
  const category = params.category;
  let [currentPage, setCurrentPage] = useState(1);
  let [price, setPrice] = useState([0, 250000]);
  let [ratings, setRatings] = useState(0);

  const priceFilterHandler = (e) => {
    let pricesString = e.target.id.split(",");
    setPrice([Number(pricesString[0]), Number(pricesString[1])]);
  };

  const RatingHandler = (e) =>{
    console.log(e.target.id);
    setRatings(Number(e.target.id));
  }

  const clearFilters = (e) => {
    setCurrentPage(1);
    setPrice([0, 250000]);
    setRatings(0);
    window.location.reload()
  }

  useEffect(() => {
    dispatch(productActions(keyword , currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, ratings, category]);
  const { products } = useSelector((state) => state.product);

  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#f4f4f5" }}>
        <div className="filterMainDiv">
          <div className="category">
            <FaFilter className="filterSymbol"></FaFilter>
            <div className="filterName">Filters</div>
          </div>
          <div className="category">
            <div className="categoryName">Price</div>
            <div className="clear" onClick={clearFilters}>Clear all</div>
          </div>
          <div>
            <div className="custom">
                <form>
                    <label className="fontSize">From : </label><input type="number" id="lo" />
                    <label className="fontSize">To : </label><input type="number" id="hi"/> <br></br>
                </form>
            </div>
            <p style={{marginLeft: "8em", marginTop:"1em", fontSize: "1.6rem"}}>or</p>
            <input
              className="inputRadio"
              type="radio"
              name="price"
              id="5000, 10000"
              onClick={priceFilterHandler}
            ></input>
            <label className="fontSize">₹ 5000 -₹ 10000</label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="price"
              id="10000, 30000"
              onClick={priceFilterHandler}
            ></input>
            <label className="fontSize">₹ 10000 -₹ 30000</label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="price"
              id="30000,80000"
              onClick={priceFilterHandler}
            ></input>
            <label className="fontSize">₹ 30000 -₹ 80000</label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="price"
              id="80000, 100000"
              onClick={priceFilterHandler}
            ></input>
            <label className="fontSize">₹ 80000 -₹ 100000</label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="price"
              id="100000, 200000"
              onClick={priceFilterHandler}
            ></input>
            <label className="fontSize">₹ 100000-₹ 200000</label>
            <br></br>
          </div>
          <div className="category">
            <div className="categoryName">Rating</div>
            <div></div>
          </div>
          <div className="price">
            <input
              className="inputRadio"
              type="radio"
              name="rating"
              id="4"
              onClick={RatingHandler}
            ></input>
            <label>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="rating"
              id="3"
              onClick={RatingHandler}
            ></input>
            <label className="fontSize">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="rating"
              id="2"
              onClick={RatingHandler}
            ></input>
            <label>
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </label>
            <br></br>
            <input
              className="inputRadio"
              type="radio"
              name="rating"
              id="0"
              onClick={RatingHandler}
            ></input>
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
          <div>
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
          <div>
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
              id="0"
            ></input>
            <label className="fontSize">High to Low</label>
          </div>
        </div>
        <div className="productMainDiv">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "114rem",
              margin: "0 auto",
            }}
          >
            {products.map((i) => (
              // <Link style={{textDecoration:'none', color:'black'}} to={`/product/${i._id}`}>
              <ProductCard
                name={i.name}
                price={i.price}
                id={i._id}
                key={i._id}
                rating = {i.ratings}
                reviews = {i.numOfReviews}
              />
              // </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
