import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../type";


export default (state, action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.token)
            return {
                ...state,
                token: action.token,
                user: action.payload.user,
                loading: false,
                error: null,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload,
                user: null
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state
    }
}