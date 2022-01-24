import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductInformation, cleanErrors } from '../../../store/actions/products/product-action';
import { useAlert } from 'react-alert';
import ProcessingAction from '../../../components/cross-cutting/processing-action/processing-action';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageTitle from "../../../components/layout/page-title/page-title";

const ProductInformation = () => {

  const { loading, product, error } = useSelector(state => state.productInformation);
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductInformation(params.id));

    if (error) {
      alert.error(error);
      dispatch(cleanErrors());
    }

  }, [dispatch, error, alert, params.id]);

  return (
    <Fragment>
      {loading? <ProcessingAction /> : 
      <Fragment>
        <PageTitle title={product.name} />
        <h1 id="products_information">Product Information</h1>
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <Carousel pause="hover">
              {product.images && product.images.map((image) => (
                <Carousel.Item key={image.public_id}>
                  <img src={image.url} className="d-block w-100" alt={product.title} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{ product.name }</h3>
            <p id="product_id">Product # { product._id }</p>

            <hr />

            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
            </div>
            <span id="no_of_reviews">({product.totalReviews} Reviews)</span>

            <hr />

            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus">-</span>
              <input
                type="number"
                className="form-control count d-inline"
                value="1"
                readOnly
              />
              <span className="btn btn-primary plus">+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status: <span className={product.stock > 0? 'greenColor' : 'redColor'} id="stock_status">{ product.stock > 0? 'In Stock' : 'Out of Stock' }</span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>
              {product.description}
            </p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <button
              id="review_btn"
              type="button"
              className="btn btn-primary mt-4"
              data-bs-toggle="modal"
              data-bs-target="#ratingModal"
            >
              Submit Your Review
            </button>

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal "
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Submit Review
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>

                        <button
                          className="btn my-3 float-right review-btn px-4 text-white"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>  
      }
    </Fragment>
  );
};

export default ProductInformation;
