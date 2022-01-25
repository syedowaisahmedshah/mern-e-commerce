import axios from 'axios';
import { 
    ALL_PRODUCTS_FETCH_START, 
    ALL_PRODUCTS_FETCH_SUCCESS, 
    ALL_PRODUCTS_FETCH_ERROR,
    PRODUCT_FETCH_START, 
    PRODUCT_FETCH_SUCCESS, 
    PRODUCT_FETCH_ERROR,
    PRODUCT_CATEGORIES_FETCH_SUCCESS,
    CLEAN_ERROR 
} from '../../constants';

const getAllProducts = (keyword, price, category = '', rating = 0, page) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_FETCH_START,
        });

        let url = `/api/v1/products?keyword=${keyword}&page=${page}&price[lte]=${price[1]}&price[gte]=${price[0]}`;

        if (category && category.trim().length > 0) {
            url += `&category=${category}`;
        }

        if (rating > 0) {
            url += `&ratings[gte]=${rating}`;
        }

        const { data } = await axios.get(url);

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

const getProductInformation = (id) => async (dispatch) => {
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

const getProductCategories = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/product/categories`);

        dispatch({
            type: PRODUCT_CATEGORIES_FETCH_SUCCESS,
            payload: data.productCategories
        });
    } catch (error) {
        console.log('Error fetching product categories');
    }
};

const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAN_ERROR
    });
};

export { getAllProducts, getProductInformation, getProductCategories, cleanErrors };
