import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Form, Input, Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import CardReactFormContainer from "card-react";
import "card-react/lib/card.css";
import { UPLOAD_ADDRESS } from "../../constants";

class AddPaymentMethod extends Component {
  static propTypes = {};
  static propTypes = {
    upload: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = ({ target: { files } }) => {
    this.setState({ file: files[0] });
  };

  handleClick = () => {
    const { file } = this.state;
    if (file) {
      this.props.upload(file);
    }
  };

  render() {
    return (
      <Header as="h5" icon>
        Please add your credit card details
        <Grid columns="12" verticalAlign="middle">
          <Grid.Column width="8">
            <CardReactFormContainer
              container="card-wrapper" // required
              formInputsNames={{
                number: "CCnumber", // optional — default "number"
                expiry: "CCexpiry", // optional — default "expiry"
                cvc: "CCcvc", // optional — default "cvc"
                name: "CCname" // optional - default "name"
              }}
              // the class name attribute to add to the input field and the corresponding part of the card element,
              // when the input is valid/invalid.
              classes={{
                valid: "valid-input", // optional — default 'jp-card-valid'
                invalid: "invalid-input" // optional — default 'jp-card-invalid'
              }}
              // specify whether you want to format the form inputs or not
              formatting // optional - default true
            >
              <div className="ui form">
                <div className="two fields">
                  <div className="field">
                    <input placeholder="Full name" type="text" name="CCname" />
                  </div>
                  <div className="field">
                    <input
                      placeholder="Card number"
                      type="text"
                      name="CCnumber"
                    />
                  </div>
                </div>
                <div className="two fields">
                  <div className="field">
                    <input placeholder="MM/YY" type="text" name="CCexpiry" />
                  </div>
                  <div className="field">
                    <input placeholder="CVC" type="text" name="CCcvc" />
                  </div>
                </div>
                <div style={{ float: "right" }}>
                  <button className="positive ui button">
                    Positive Button
                  </button>
                </div>
              </div>
            </CardReactFormContainer>
          </Grid.Column>

          <Grid.Column width="4">
            <div id="card-wrapper" />
          </Grid.Column>
        </Grid>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  cardSending: state.ui.cardSending
});

const mapDispatchToProps = dispatch => ({
  upload: file =>
    dispatch({
      type: UPLOAD_ADDRESS,
      payload: file
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethod);
