import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ProcessingAction from "../processing-action/processing-action";
import {
  registerUser,
  cleanErrors,
} from "../../../store/actions/auth/auth-action";
import PageTitle from "../../layout/page-title/page-title";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [defaultAvatar, setDefaultAvatar] = useState(
    "/images/default-user-avatar.jpg"
  );

  const alert = useAlert();

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector( (state) => state.auth );

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(cleanErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, loading, alert, isAuthenticated]);

  const registerHandler = (e) => {
    e.preventDefault();

    const userInfo = new FormData();

    userInfo.set("name", name);
    userInfo.set("email", email);
    userInfo.set("password", password);
    userInfo.set("avatar", avatar);

    dispatch(registerUser(userInfo));
  };

  const avatarHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatar(reader.result.toString());
            setDefaultAvatar(reader.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      {loading ? (
        <ProcessingAction />
      ) : (
        <Fragment>
          <PageTitle title="Register"></PageTitle>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                onSubmit={registerHandler}
              >
                <h1 className="mb-3 register-title">Register</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
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
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={defaultAvatar}
                          className="rounded-circle"
                          alt="Default Avatar"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={avatarHandler}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        { avatar? 'Avatar Selected' : 'Choose Avatar'}
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={ loading ? true : false }
                >
                  Register
                </button>

                <Link to="/login" className="float-right mt-3">
                  Login Instead
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RegisterUser;
