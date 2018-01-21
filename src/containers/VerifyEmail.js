import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import LoadingSection from "../components/LoadingSection";
import { VERIFY_EMAIL } from "../constants";

class VerifyEmail extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    verifyEmail: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool,
    error: PropTypes.string
  };

  static defaultProps = {
    loggedIn: false,
    error: null
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const {
      history,
      history: { match: token },
      verifyEmail,
      loggedIn
    } = this.props;
    if (loggedIn) {
      history.replace("/");
    } else {
      verifyEmail(token);
    }
  }

  render() {
    const { error } = this.props;
    return (
      <div>
        {error ? (
          <Message negative>
            <Message.Header>We could not verify your email</Message.Header>
            <p>{error}</p>
          </Message>
        ) : (
          <LoadingSection />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  error: state.errors.verifyEmail
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: token => dispatch({ type: VERIFY_EMAIL, payload: token })
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
