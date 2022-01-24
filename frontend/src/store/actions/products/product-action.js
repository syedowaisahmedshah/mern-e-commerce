import axios from 'axios';
import { 
    ALL_PRODUCTS_FETCH_START, 
    ALL_PRODUCTS_FETCH_SUCCESS, 
    ALL_PRODUCTS_FETCH_ERROR,
    PRODUCT_FETCH_START, 
    PRODUCT_FETCH_SUCCESS, 
    PRODUCT_FETCH_ERROR,
    CLEAN_ERROR 
} from '../../constants';

const getAllProducts = () => async dispatch => {
    try {
        dispatch({
            type: ALL_PRODUCTS_FETCH_START,
        });

        const { data } = await axios.get('/api/v1/products', {
            options: {
                contentType: 'application/json',
            }
        });

        dispatch({
            type: ALL_PRODUCTS_FETCH_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FETCH_ERROR,
            payload: error.response.data.message
        });
    }
};

const getProductInformation = (id) => async dispatch => {
    try {
        dispatch({
            type: PRODUCT_FETCH_START,
        });

        const { data } = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: PRODUCT_FETCH_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_FETCH_ERROR,
            payload: error.response.data.message
        });
    }
};

const cleanErrors = () => async dispatch => {
    dispatch({
        type: CLEAN_ERROR
    });
};

export { getAllProducts, getProductInformation, cleanErrors };
