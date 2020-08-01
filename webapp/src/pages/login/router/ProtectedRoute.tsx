import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../Auth';

const mapStateToProps = (state: { userReducer: { user: any; }; }) => ({
  user: state.userReducer.user,
});

export const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const can = auth.canEnter(rest.user, props.location);
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

export default connect(mapStateToProps)(ProtectedRoute);

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
  history: PropTypes.object,
  location: PropTypes.object,
  user: PropTypes.object
};
