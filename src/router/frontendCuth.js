import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect} from 'react-router-dom';
const PrivateRoute = ({component:Component,...rest}) => {
    console.log(...rest)
    return (
      <Route
      {...rest}
      render={props =>
        window.localStorage.getItem('login') === '1' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
    )
  }

  export default PrivateRoute