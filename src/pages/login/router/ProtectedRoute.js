import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fakeAuth } from '../Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const redirectTo = fakeAuth.canEnter(props.location);
        return !redirectTo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location }
            }}
          />
        );
      }
      }
    />
  );
};

export default ProtectedRoute;
