import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productActions } from "../../Actions/Product";

import Carousel from "react-material-ui-carousel";
import "./Home.css";
import Card from "../Products/Card";

const images = [
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
  "/images/carousel-3.jpg",
  "/images/carousel-4.jpg",
  "/images/carousel-5.jpg",
];

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions());
  }, [dispatch]);

  let { products } = useSelector((state) => state.product);
  let filtered = products.slice(0, 8);
  return (
    <>
      <div style={{ marginTop: "8em", backgroundColor: "#f4f4f5" }}>
        <Carousel>
          {images.map((image, i) => (
            <img className="images" src={image} key={i} alt={`${i}th Slide`} />
          ))}
        </Carousel>
      </div>

      <div
        style={{ width: "100%", padding:"2em 0", height:"85rem", backgroundColor: "#f4f4f5"}}
      >
        <div style={{ width: "1200px", margin:"0 auto" }}>
          <h1 className="featuredProductHeading">FEATURED PRODUCTS</h1>
          <div className="line"></div>
          <div className="featuredProducts">
            {filtered.map((product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.price}
                id={product._id}
                reviews = {product.reviews.length}
              />
            ))}
          </div>
        </div>
      </div>

      <div >
        <div className="banner-div" style={{ padding: "2rem 0", backgroundColor: "#f4f4f5" }}>
          <div className="banner-heading">REDMI NOTE 11T 5G</div>
          <img
            src="/images/REdmi-note11.jpeg"
            alt="..."
            className="banner-img"
          />
          <div className="banner-offer">
            Robust Performance With MediaTek Dimensity 810 5G | 5000mah Long
            Lasting Battery
            <br></br>
            <br></br> Launch price: From Rs.15,999 Sale ends at 12am
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
