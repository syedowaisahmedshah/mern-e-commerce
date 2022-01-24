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

const productsReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case ALL_PRODUCTS_FETCH_START: 
            return {
                ...state,
                loading: true, 
                products: []
            };
        case ALL_PRODUCTS_FETCH_SUCCESS: 
            return {
                ...state,
                loading: false, 
                products: action.payload.products,
                currentCount: action.payload.currentCount,
                allCount: action.payload.allCount,
                pageSize: action.payload.pageSize
            };
        case ALL_PRODUCTS_FETCH_ERROR: 
            return {
                ...state,
                loading: false, 
                error: action.payload
            };
        case CLEAN_ERROR: 
            return {
                ...state,
                loading: false, 
                error: null
            };
        default: 
            return {
                ...state
            };
    }
};

const productInformationReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_FETCH_START: 
            return {
                ...state,
                loading: true 
            };
        case PRODUCT_FETCH_SUCCESS: 
            return {
                ...state,
                loading: false, 
                product: action.payload
            };
        case PRODUCT_FETCH_ERROR: 
            return {
                ...state,
                loading: false, 
                error: action.payload
            };
        case CLEAN_ERROR: 
            return {
                ...state,
                loading: false, 
                error: null
            };
        default: 
            return {
                ...state
            };
    }
};

const productCategoriesReducer = (state = { productCategories: [] }, action) => {
    switch(action.type) {
        case PRODUCT_CATEGORIES_FETCH_SUCCESS: 
            return {
                ...state,
                productCategories: action.payload
            };
        default: 
            return {
                ...state
            };
    }
};

export { productsReducer, productInformationReducer, productCategoriesReducer };