import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContextState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlerState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";


import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}


function App() {
  return (
    <AuthState>
      <ContactState>
        <AlerState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}/>
                  <Route exact path="/about" component={About} />
                  <PublicRoute exact path="/register" component={Register}/>
                  <PublicRoute exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
          </AlerState>
      </ContactState>
    </AuthState>
  );
}

export default App;
