import React, { useReducer } from "react";
import uuid from "uuid";
import AlerContext from "./alertContext";
import alertReducer from "./alertReducer";

import {
    SET_ALERT,
    REMOVE_ALERT
} from "../type";


const AlertState = props =>{
    const initialState = [];
    const [ state , dispatch ] = useReducer(alertReducer, initialState);

    const setAlert = (msg, type, timeout)=>{
        const id = uuid.v4();
        dispatch({
            type: SET_ALERT,
            alert: { id , msg , type }
        })

        setTimeout( ()=> dispatch({type: REMOVE_ALERT, id}), timeout)
    };

    return(
        <AlerContext.Provider 
            value={{
                alerts: state,
                setAlert
            }}
        >
            {props.children}
        </AlerContext.Provider>
    )
}


export { AlertState as default }