import React , {useReducer}  from "react";
import axios from "axios";
import AuthContext from "./authContext";
import contextReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = props=>{
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        user: null,
        error: null
    }
    const [ state, dispatch ] = useReducer(contextReducer, initialState);

    const loadUser = async ()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/v1/auth');
            dispatch({
                type:USER_LOADED,
                payload: res.data
            })
        }catch(error){
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    const registerUser =async dataRegister =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.post('/api/v1/users', dataRegister, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
                token: res.headers['x-auth-token']
            })

            loadUser()
        }catch(err){
            return dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.error
            })
        }
    }


    const loginUser =async dataLogin =>{
        console.log(dataLogin)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.post('/api/v1/auth', dataLogin, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
                token: res.headers['x-auth-token']
            })

            loadUser()
        }catch(err){
            return dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.error
            })
        }
    }

    const logout = _=>dispatch({type: LOGOUT})

    const clearError = _=> dispatch({type: CLEAR_ERRORS})
    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                registerUser,
                clearError,
                loadUser,
                loginUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}


export {AuthState as default}