import React, { Component } from "react";
import { connect } from "react-redux";
import { REQUEST_LOGIN } from "../constants";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
  state = {};

  submit = data => this.props.login(data);

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} error={this.state.error} />
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
  loginError: state.user.loginError
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
