import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const can = auth.canEnter(props.history, props.location);
        return  can.flag ? (
          <Component {...props} />
        ) : (
          <Redirect
            push
            to={{
              pathname: can.to,
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

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
  history: PropTypes.object,
  location: PropTypes.object
};
