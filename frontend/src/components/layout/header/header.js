import React, { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import Search from "../../cross-cutting/search/search";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const signIn = () => {
    navigate('/login');
  }

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to={`/`}>
              <img
                className="logo"
                src="./images/mern-e-commerce-no-text.png"
                alt="Company Logo"
              />
              <span className="logo-text">MERN-E-COMMERCE</span>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search navigate={navigate} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button onClick={signIn} className="btn" id="login_btn">
            Sign In
          </button>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
