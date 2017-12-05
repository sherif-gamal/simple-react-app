import React, { Component } from "react";
import { connect } from "react-redux";
import { SIGNUP } from "../constants";
import SignupForm from "./SignupForm";

class SignupPage extends Component {
  submit = data => this.props.signup(data);

  render() {
    const { location, signupError } = this.props;
    const emailAddress = location.state
      ? location.state.emailAddress
      : undefined;
    return (
      <div>
        <SignupForm
          emailAddress={emailAddress}
          submit={this.submit}
          signupError={signupError}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: data => dispatch({ type: SIGNUP, payload: data })
});

const mapStateToProps = state => ({
  signupError: state.user.signupError
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
