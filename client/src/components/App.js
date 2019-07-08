import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions';

import { Provider } from 'react-redux';
import store from '../stores/store';
import history from '../history';

import Header from './layout/Header';
import Landing from './auth/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from './privateRoute';
import Dashboard from './dashboard';

/**
 * Check for token to keep user logged in
 */
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token and get user info and exp
  const decoded = jwt_decode(token);
  // set user and authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000 // to get in millisecond
  if (decoded.exp < currentTime ) {
    // logout user
    store.dispatch(logoutUser());

    // redirecto to login
    window.location.href = './login';
  }
}

const App = () => {
    return (        
      <div className="ui container">
        <Provider store={store}>
            <Router history={history}>
                    <div>
                        <Header />                                
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </div>
            </Router>
        </Provider>
      </div>
    );
};

export default App;