import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { REQUEST_LOGIN } from "../constants";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
  static propTypes = {
    errors: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired
  };
  state = {};

  submit = data => this.props.login(data);

  render() {
    const { errors } = this.props;
    return (
      <div>
        <LoginForm submit={this.submit} error={errors.login} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => {
    dispatch({ type: REQUEST_LOGIN, payload: data });
  }
});

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
