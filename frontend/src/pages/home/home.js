import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../components/layout/page-title/page-title";
import {
  getAllProducts,
  getProductCategories,
  cleanErrors,
} from "../../store/actions/products/product-action";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/products/product/product";
import ProcessingAction from "../../components/cross-cutting/processing-action/processing-action";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Home = () => {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);

  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, pageSize, currentCount } = useSelector(
    (state) => state.products
  );
  const { productCategories } = useSelector(
    (state) => state.productCategories
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(cleanErrors());
    }
    
    dispatch(getProductCategories());

    dispatch(getAllProducts(keyword || "", price, category, rating, currentPage));

  }, [dispatch, error, alert, currentPage, keyword, price, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <ProcessingAction />
      ) : (
        <Fragment>
          <PageTitle title="Home" />

          <h1 id="products_heading">Products List</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-3 mb-5">
                    <div className="px-5">
                      <h4 className="mb-3 filter-title">
                            Price
                      </h4>

                      <Range
                        marks={{
                          1: "$1",
                          1000: "$1000",
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className="my-4" />
                      
                      <div className="mt-3">
                        <h4 className="mb-3 filter-title">
                          Categories
                        </h4>

                        <ul className="pl-0">
                          {productCategories && productCategories.map((category) => (<li
                            className="category-item"
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            {category}
                          </li>))
                          }
                        </ul>
                      </div>

                      <hr className="my-4" />
                      
                      <div className="mt-3">
                        <h4 className="mb-3 filter-title">
                          Rating
                        </h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((rating) => (<li
                            className="rating-item"
                            key={rating}
                            onClick={() => setRating(rating)}
                          >
                            <div className="rating-outer">
                              <div className="rating-inner"
                                style={{ width: `${rating * 20}%`}}
                              >
                              </div>
                            </div>
                          </li>))
                          }
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product key={product._id} product={product} col={4} />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {pageSize < currentCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={pageSize}
                totalItemsCount={currentCount}
                onChange={handleCurrentPage}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
