import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user && user.admin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: "/" }
          }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  token: PropTypes.string,
  user: PropTypes.shape(),
  component: PropTypes.shape({}).isRequired
};

AdminRoute.defaultProps = {
  token: null,
  user: null
};

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});

export default connect(mapStateToProps)(AdminRoute);
