import { 
        ALL_PRODUCTS_FETCH_START, 
        ALL_PRODUCTS_FETCH_SUCCESS, 
        ALL_PRODUCTS_FETCH_ERROR,
        ALL_PRODUCTS_CLEAR
} from '../../constants';

const initialState = {
    products: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_FETCH_START: 
            return {
                loading: true, 
                products: []
            };
        case ALL_PRODUCTS_FETCH_SUCCESS: 
            return {
                loading: false, 
                products: action.payload.products,
                totalProducts: action.payload.totalCount
            };
        case ALL_PRODUCTS_FETCH_ERROR: 
            return {
                loading: false, 
                error: action.payload
            };
        case ALL_PRODUCTS_CLEAR: 
            return {
                loading: false, 
                error: null
            };
        default: 
            return {
                ...state
            };
    }
};

export { productsReducer };