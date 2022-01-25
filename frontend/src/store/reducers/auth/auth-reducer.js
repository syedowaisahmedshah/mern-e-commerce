import { 
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAN_ERROR  
} from '../../constants';

const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAN_ERROR:
            return {
                ...state,
                error: null
            };
        default: {
            return {
                ...state
            };
        }
    }
};

const registerUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_START:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAN_ERROR:
            return {
                ...state,
                error: null
            };
        default: {
            return {
                ...state
            };
        }
    }
};

export { authReducer, registerUserReducer };