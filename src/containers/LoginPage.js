import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';

class LoginPage extends Component {
  submit = data => this.props.login();

  render() {
    return (
      <div>
        <LoginForm submit={this.submit} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () =>  console.log('logged Isdfsn')
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
