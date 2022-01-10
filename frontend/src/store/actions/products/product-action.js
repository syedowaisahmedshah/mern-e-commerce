import axios from 'axios';
import { 
    ALL_PRODUCTS_FETCH_START, 
    ALL_PRODUCTS_FETCH_SUCCESS, 
    ALL_PRODUCTS_FETCH_ERROR,
    ALL_PRODUCTS_CLEAR 
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

const clearErrors = () => async dispatch => {
    dispatch({
        type: ALL_PRODUCTS_CLEAR
    });
};

export { getAllProducts, clearErrors };
