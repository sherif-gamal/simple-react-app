import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';

class LoginPage extends Component {
  submit = data => this.props.signup();

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: () =>  console.log('Signed up')
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
