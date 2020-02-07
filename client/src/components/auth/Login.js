import React, { useState, useContext, useEffect} from "react";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";


const Login = (props)=>{
    const { setAlert } = useContext(alertContext);
    const { loginUser, error, clearError, loadUser , isAuthenticated }= useContext(authContext);
    const [ user , setUser ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    useEffect(()=>{
        loadUser();
        if(isAuthenticated){
            props.history.push("/")
        }
        if(error === 'Please signup first' || error ==='Password invalid.'){
            setAlert(error, 'danger');
            clearError()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history ])


    const onChange= e=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(email === '' || password=== ''){
            return setAlert('Please enter all fields', 'danger');
        }
        loginUser({email , password});
    }
    return(
        <div className="form-container">
            <h1>
                <span className="text-primary"> Account Login </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login"  className="btn btn-primary btn-block"/>
            </form>
        </div>
    );
};


export { Login as default }