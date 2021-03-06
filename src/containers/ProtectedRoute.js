import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
          push
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  token: PropTypes.string,
  user: PropTypes.shape(),
  component: PropTypes.func.isRequired
};

ProtectedRoute.defaultProps = {
  token: null,
  user: null
};

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

export default connect(mapStateToProps)(ProtectedRoute);
