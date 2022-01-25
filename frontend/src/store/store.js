import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productCategoriesReducer, productInformationReducer } from './reducers/products/product-reducer';
import { authReducer } from './reducers/auth/auth-reducer';

const reducer = combineReducers({
    products: productsReducer,
    productInformation: productInformationReducer,
    productCategories: productCategoriesReducer,
    auth: authReducer
});

const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;