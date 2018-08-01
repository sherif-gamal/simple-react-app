import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import LoadingSection from "../components/LoadingSection";
import { VERIFY_EMAIL } from "../constants";

class VerifyEmail extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    verifyEmail: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool,
    emailVerification: PropTypes.string,
    error: PropTypes.string
  };

  static defaultProps = {
    loggedIn: false,
    emailVerification: "loading",
    error: null
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const {
      history,
      match: { params: { token } },
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
    const { error, emailVerification } = this.props;
    return (
      <div>
        {(emailVerification === "loading" && (
          <LoadingSection active style={{ top: "40%", height: "100px" }} />
        )) ||
          (error && (
            <main style={{ textAlign: "center" }}>
              <Message negative size="big">
                <Message.Header>We could not verify your email</Message.Header>
                <p>{error}</p>
              </Message>
            </main>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  error: state.errors.verifyEmail,
  emailVerification: state.appState.emailVerification
});

const mapDispatchToProps = dispatch => ({
  verifyEmail: token => dispatch({ type: VERIFY_EMAIL, payload: token })
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
