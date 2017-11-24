import React, { Component } from "react";
import { connect } from "react-redux";
import { SIGNUP } from "../constants";
import SignupForm from "./SignupForm";

class LoginPage extends Component {
  submit = data => this.props.signup(data);

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} signupError={this.props.signupError} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: data => dispatch({ type: SIGNUP, payload: data })
});

const mapStateToProps = state => {
  return {
    signupError: state.user.signupError
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
