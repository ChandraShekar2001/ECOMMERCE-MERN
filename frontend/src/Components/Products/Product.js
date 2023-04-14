import React, { useState, useEffect } from 'react'
import { BsHandbag, BsTruck } from 'react-icons/bs'
import { CiPercent } from 'react-icons/ci'
import {addItem} from "../../Actions/Cart"
import { FaStar } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import image1 from "../../images/carousel-2.jpg"
import { fetchSingleProduct } from "../../Actions/Product";
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom';
import { newReview } from '../../Actions/Product';
import './Product.css'
import { useAlert } from "react-alert";

function Product() {
  const params = useParams()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [selectedImage, setSelectedIMage] = useState();

  const id = params.id;


  const { product, loading } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const addItemsToCartHandler = () => {
    dispatch(addItem(id, 1))
    alert.success("Item added to cart")
    // console.log(props.id);
  }

  const handleImageClick = (src) => {
    setSelectedIMage(src);
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');



  const colors = {
    orange: "#008000",
    grey: "#a9a9a9"

  };


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const Star = ({ star }) => {
    const ratingStar = stars.map((_, index) => {
      return (
        <FaStar
          key={index}
          size={24}
          onClick={() => handleClick(index + 1)}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseLeave={handleMouseLeave}
          color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
          style={{
            marginRight: 10,
            cursor: "pointer"
          }}
        />
      )
    })

    return (
      <>
        <div>
          {ratingStar}
        </div>
      </>
    )
  };

  const style = {
    hover: {
      transform: "scale(110%)",
      transition: "transform 1s, filter .20s ease-in-out",
      transformOrigin: "center center",
      filter: "brightness(95%)"
    },

    style: {
      // marginTop:"6em",
      overflow: "hidden"
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(review, currentValue);
    const rating = currentValue;
    const comment = review
    dispatch(newReview({rating, comment, id}));
    
  }
  return (
    <>
      {!loading && product? <>
        <div className='product-view'>
          <div className='images-box'>

            <div className='image-column'>
              {
                product.images.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image.url} alt="" className='image' onClick={() => (handleImageClick(image))} />
                    </div>
                  )
                })
              }
            </div>

            <div className='display-box'>
              <img src={!selectedImage ? (product.images.length > 0 ? product.images[0].url : image1) : selectedImage.url} alt='' className='display-img' />
            </div>
          </div>

          <div className='product-details'>
            <div className='product-name'>
              {product.name}
            </div>

            <div className='product-rating-box'>
              <div className='product-rating'>
                {product.ratings}.0
              </div>
              <div className='product-rating-star'>&#9733;</div>
              <div className='product-rating-seperator'>|</div>
              <div className='product-rating-count'>{product.numOfReviews} Ratings</div>
            </div>
            <div className='line' />

            <div className='product-price-box'>
              <div className='sale-price'>
                ₹{product.price}
              </div>
              <div className='mrp-tag'>MRP</div>
              <div className='mrp-price'>
                ₹{Math.floor(product.price * 1.1)}
              </div>
              <div className='offer-percentage'>(10% OFF)</div>
            </div>

            <div className='tax-text'>
              Inclusive of all taxes
            </div>

            <div className='buttons-box'>
              <button className='add-to-cart buttons' onClick = {addItemsToCartHandler}><BsHandbag /> ADD TO CART</button>
              <button className='buy-now buttons'>BUY NOW</button>
            </div>
            <div className='line' />

            <div className='delivery-heading'>
              DELIVERY <BsTruck style={{ fontSize: '1.3em' }} />
            </div>
            <div className='delivery-text-box'>
              <div>100% Original Products</div>
              <div>Pay on delivery available</div>
              <div>Easy 10 day return and exchange</div>
              <div>Assured Delivery</div>
            </div>
            <div className='line' />

            <div className='offers-heading'>
              Best Offers <CiPercent style={{ fontSize: '1.2em' }} />
            </div>
            <dvi className='offers-box'>
              <div className='offer-box'>
                <div className='offer-heading'>
                  Bank Offer
                </div>
                <div className='offer-text'>
                  Upto ₹15,000 off on select credit cards.
                </div>
              </div>
              <div className='offer-box'>
                <div className='offer-heading'>
                  No Cost EMI
                </div>
                <div className='offer-text'>
                  No cost EMI with HDFC Bank Accounts.
                </div>
              </div>
              <div className='offer-box'>
                <div className='offer-heading'>
                  Cash Back
                </div>
                <div className='offer-text'>
                  Upto ₹1,500 cashback on UPI payments.
                </div>
              </div>
            </dvi>
            <div className='line' />

            <div className='details-heading'>
              Product Details
            </div>
            <div className='details-text'>
              {product.description}
            </div>

          </div>
        </div>

        <div className='similar-products-heading'>
          SIMILAR PRODUCTS
        </div>
        <div className='similar-products-box'>
          <div className='similar-product-box'>
            <div className='similar-product-image'>
              <img src={image1} alt='' />
            </div>
            <div className='similar-product-name'>
              Asus Laptop
            </div>
            <div className='similar-product-price'>
              ₹ 60,000
            </div>
            <div className='similar-product-rating-box'>
              <div className='similar-product-rating'>
                4.0
              </div>
              <div className='similar-product-rating-star'>&#9733;</div>
              <div className='similar-product-rating-seperator'>|</div>
              <div className='similar-product-rating-count'>20 Ratings</div>
            </div>
          </div>
          <div className='similar-product-box'>
            <div className='similar-product-image'>
              <img src={image1} alt='' />
            </div>
            <div className='similar-product-name'>
              Asus Laptop
            </div>
            <div className='similar-product-price'>
              ₹ 60,000
            </div>
            <div className='similar-product-rating-box'>
              <div className='similar-product-rating'>
                4.0
              </div>
              <div className='similar-product-rating-star'>&#9733;</div>
              <div className='similar-product-rating-seperator'>|</div>
              <div className='similar-product-rating-count'>20 Ratings</div>
            </div>
          </div>
          <div className='similar-product-box'>
            <div className='similar-product-image'>
              <img src={image1} alt='' />
            </div>
            <div className='similar-product-name'>
              Asus Laptop
            </div>
            <div className='similar-product-price'>
              ₹ 60,000
            </div>
            <div className='similar-product-rating-box'>
              <div className='similar-product-rating'>
                4.0
              </div>
              <div className='similar-product-rating-star'>&#9733;</div>
              <div className='similar-product-rating-seperator'>|</div>
              <div className='similar-product-rating-count'>20 Ratings</div>
            </div>
          </div>
          <div className='similar-product-box'>
            <div className='similar-product-image'>
              <img src={image1} alt='' />
            </div>
            <div className='similar-product-name'>
              Asus Laptop
            </div>
            <div className='similar-product-price'>
              ₹ 60,000
            </div>
            <div className='similar-product-rating-box'>
              <div className='similar-product-rating'>
                4.0
              </div>
              <div className='similar-product-rating-star'>&#9733;</div>
              <div className='similar-product-rating-seperator'>|</div>
              <div className='similar-product-rating-count'>20 Ratings</div>
            </div>
          </div>
          <div className='similar-product-box'>
            <div className='similar-product-image'>
              <img src={image1} alt='' />
            </div>
            <div className='similar-product-name'>
              Asus Laptop
            </div>
            <div className='similar-product-price'>
              ₹ 60,000
            </div>
            <div className='similar-product-rating-box'>
              <div className='similar-product-rating'>
                4.0
              </div>
              <div className='similar-product-rating-star'>&#9733;</div>
              <div className='similar-product-rating-seperator'>|</div>
              <div className='similar-product-rating-count'>20 Ratings</div>
            </div>
          </div>

        </div>

        <div className='reviews-heading'>
          REVIEWS

          <button className='add-to-cart review-button' data-bs-toggle="modal" data-bs-target="#exampleModal" >Add Review</button>
        </div>
        <div className="modal" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content m-size">
              <div className="modal-header">
                <h5 className="modal-title m-heading">Your review</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex flex-column align-items-center justify-content-center">
                <form className='mb-2 m-form' >
                  <input type="textarea" onChange={(e) => {
                    setReview(e.target
                      .value
                    )
                  }} value={review} placeholder='Review here' />
                </form>
                <Star star={currentValue} />

              </div>
              <div className="modal-footer">
                <button type="button" className="add-to-cart buttons" onClick={onSubmitHandler} data-bs-dismiss="modal">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className='reviews-box'>
          {
            product.reviews.map((review, index) => {
              return (
                <div className='review-box'>
                  <div className='review-heading'>
                    <div className='review-info-box'>
                      <div className='profile-pic'>
                        <img src={image1} alt='' />
                      </div>
                      <div className='review-info'>
                        <div className='review-name'>{review.name}</div>
                        <div className='review-date'>2022-12-13</div>
                      </div>
                    </div>
                    <div className='review-rating-box'>
                      <div className='review-rating'>
                        {review.rating}.0
                      </div>
                      <div className='product-rating-star'>&#9733;</div>
                    </div>
                  </div>
                  <div className='line' />
                  <div className='review-text'>
                    {review.comment}
                  </div>
                </div>
              )
            })
          }
        </div>
      </> : <p>Loading....</p>}
    </>
  )
}


export default Product