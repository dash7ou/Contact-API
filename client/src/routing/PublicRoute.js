import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const PublicRoute = ( { component: Component, ...rest} )=>{
    const { isAuthenticated } = useContext(AuthContext);
    return(
        <Route {...rest} render={props=> isAuthenticated ? (
            <Redirect to="/" />
            ): (
                <Component {...props}/>
            )}
        />
    )
}


export { PublicRoute as default }