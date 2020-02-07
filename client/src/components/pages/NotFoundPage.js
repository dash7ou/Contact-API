import React from "react";
import { Link } from "react-router-dom";


const NotFoundPage = ()=>{
    return (
        <div>
            <h1>NOT FOUND PAGE</h1>
            <p className="my-1">
                404 error - this page not found <Link to="/">Return home page</Link>
            </p>
        </div>
    )
}


export { NotFoundPage as default}