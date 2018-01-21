import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SIGNUP } from "../constants";
import SignupForm from "./SignupForm";

class SignupPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.string
    }).isRequired,
    signupError: PropTypes.string,
    signup: PropTypes.func.isRequired
  };

  static defaultProps = {
    signupError: null
  };

  submit = data => this.props.signup(data);

  render() {
    const { location, signupError } = this.props;
    const emailAddress = location.state
      ? location.state.emailAddress
      : undefined;
    return (
      <div>
        <SignupForm
          prefilledEmail={emailAddress}
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
  signupError: state.errors.SIGNUP_ERROR
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
