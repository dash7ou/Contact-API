import React, { useState, useContext, useEffect } from "react";
import alertContext from "../../context/alert/alertContext";
import authContext from "../../context/auth/authContext";

const Register = (props)=>{
    const { setAlert } = useContext(alertContext);
    const { registerUser, error, clearError, isAuthenticated } = useContext(authContext);

    const [ user , setUser ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2 } = user;


    useEffect(()=>{
        if(isAuthenticated){
            props.history.push("/")
        }
        if(error === 'User is already exist'){
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
        if(name === '' || email === '' || password === '' || password2 === ''){
            setAlert('Please enter all fields', 'danger');
        }else if(password !== password2){
            setAlert('Password do not match', 'danger')
        }else{
            registerUser({
                email,
                password,
                password2,
                name
            })
        }
    }
    return(
        <div className="form-container">
            <h1>
                <span className="text-primary"> Register </span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength='6'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} required minLength='6'/>
                </div>
                <input type="submit" value="Register"  className="btn btn-primary btn-block"/>
            </form>
        </div>
    );
};


export { Register as default }