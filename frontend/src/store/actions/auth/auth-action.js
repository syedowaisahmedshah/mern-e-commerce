import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAN_ERROR,
} from "../../constants";
import axios from "axios";

const login = (email, password) => async (dispatch) => {
  try {

    dispatch({
      type: LOGIN_START,
    });

    const { data } = await axios.post(
      `/api/v1/login`,
      {
        email,
        password,
      },
      {
        headers: { "content-type": "application/json" },
      }
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      error: error.response.data.message,
    });
  }
};

const registerUser = (userInfo) => async (dispatch) => {
    try {
  
      dispatch({
        type: REGISTER_USER_START,
      });
  
      const { data } = await axios.post(
        `/api/v1/auth`,
        userInfo,
        {
            headers: { "content-type": "multipart/form-data" }
        }
      );
  
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user
      });
  
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        error: error.response.data.message
      });
    }
  };

const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAN_ERROR
    });
};

export { login, registerUser, cleanErrors };
