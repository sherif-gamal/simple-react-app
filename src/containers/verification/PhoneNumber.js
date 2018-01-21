import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Message, Input, Button, Icon, Header } from "semantic-ui-react";
import Phone, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/rrui.css";
import "react-phone-number-input/style.css";
import Verified from "../../components/Verified";
import Pending from "../../components/Pending";
import { SET_PHONE_NUMBER, SEND_SMS_CODE } from "../../constants";

class PhoneNumber extends Component {
  static propTypes = {
    user: PropTypes.shape({
      phoneVerification: PropTypes.boolean
    }),
    ui: PropTypes.shape({}).isRequired,
    setPhoneNumber: PropTypes.func.isRequired,
    sendSMSCode: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: {}
  };

  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  sendPhoneNumber = e => {
    e.preventDefault();
    const value = this.state.value;
    if (isValidPhoneNumber(value)) {
      this.props.setPhoneNumber(value);
    } else {
      this.setState({ blankError: true });
    }
  };

  updateSMSCode = (e, { value }) => {
    this.setState({ smsCode: value });
  };

  sendSMSCode = e => {
    e.preventDefault();
    const code = this.state.smsCode;
    this.props.sendSMSCode(code);
  };

  render() {
    const { value, blankError } = this.state;
    const { user, ui } = this.props;
    return (
      <div>
        <Header as="h3">
          <Icon name="mobile" />
          <Header.Content>
            Phone number
            <Header.Subheader>
              We will send you an SMS with a code that you will be required to
              verify yourself.
            </Header.Subheader>
          </Header.Content>
        </Header>

        <div style={{ width: "50%", margin: "auto" }}>
          {(user.phoneVerification === "V" && <Verified />) || (
            <form>
              <Grid>
                <Grid.Column width="10">
                  <Phone
                    style={{ color: "black" }}
                    placeholder="Enter phone number"
                    value={value}
                    country="AU"
                    onChange={val => this.setState({ value: val })}
                    error={
                      (blankError || value) &&
                      !isValidPhoneNumber(value) &&
                      "Invalid Phone Number"
                    }
                    indicateInvalid
                  />
                </Grid.Column>
                <Grid.Column width="2">
                  <Button
                    onClick={this.sendPhoneNumber}
                    primary
                    disabled={!isValidPhoneNumber(value)}
                  >
                    Submit
                  </Button>
                </Grid.Column>
              </Grid>
            </form>
          )}
          {user.phoneVerification === "P" ? (
            <Message negative={ui && ui.errorVerifyingPhone}>
              <Message.Header>
                Please enter the code that was sent to you via SMS
              </Message.Header>
              <Input onChange={this.updateSMSCode} />
              <Button positive onClick={this.sendSMSCode}>
                Verify
              </Button>
            </Message>
          ) : null}
          {ui && ui.errorSettingPhone ? (
            <Message negative>
              <Message.Header>
                There was an error while saving your phone number, please try
                again
              </Message.Header>
            </Message>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  setPhoneNumber: phoneNumber =>
    dispatch({ type: SET_PHONE_NUMBER, payload: phoneNumber }),
  sendSMSCode: code => dispatch({ type: SEND_SMS_CODE, payload: code })
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
