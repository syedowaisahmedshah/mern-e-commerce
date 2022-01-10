import React, { Fragment, useEffect } from "react";
import PageTitle from "../../components/layout/page-title/page-title";
import { getAllProducts } from "../../store/actions/products/product-action";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/products/product/product";
import ProcessingAction from "../../components/layout/processing-action/processing-action";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, totalProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      { loading ? (
        <ProcessingAction />
      ) : (
        <Fragment>
          <PageTitle title="Home" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
