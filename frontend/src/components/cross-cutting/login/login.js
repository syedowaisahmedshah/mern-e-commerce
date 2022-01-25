import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ProcessingAction from "../processing-action/processing-action";
import { login, cleanErrors } from "../../../store/actions/auth/auth-action";
import PageTitle from '../../layout/page-title/page-title';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(cleanErrors());
    }

    if (isAuthenticated) {
        navigate('/');
    }

  }, [dispatch, error, loading, alert, isAuthenticated]);

  const loginHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
  }

  return (
    <Fragment>
      {loading ? (
        <ProcessingAction />
      ) : (
        <Fragment>
          <PageTitle title="Login"></PageTitle>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={loginHandler}>
                <h1 className="mb-3 login-title">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Login
                </button>

                <Link to="/register" className="float-right mt-3">
                  Register?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
