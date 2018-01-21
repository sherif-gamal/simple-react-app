import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Step,
  Icon,
  Grid,
  Segment,
  Header,
  Form,
  Input,
  Button
} from "semantic-ui-react";
import { UploadID, UploadAddress, PhoneNumber } from "./verification";
import LoadingSection from "../components/LoadingSection";

const style = { padding: "30px" };
class Verify extends Component {
  static propTypes = {
    user: PropTypes.shape({})
  };
  static defaultProps = {
    user: {}
  };

  constructor(props) {
    super(props);

    this.state = { activeStep: null };
  }

  setActiveStep(activeStep) {
    this.setState({ activeStep });
  }

  states(prop) {
    const user = this.props.user;
    return user
      ? {
          completed: this.props.user[prop] === "V",
          disabled: this.props.user[prop] === "P"
        }
      : {};
  }

  render() {
    const { user } = this.props;
    const { activeStep } = this.state;

    return (
      <main>
        <section style={{ textAlign: "center" }}>
          To continue using Bitmate you must verify your account. Please upload
          the following documents to proceed.
        </section>
        <br />
        {user ? (
          <Segment.Group raised style={{ color: "black" }}>
            <Segment style={style}>
              <PhoneNumber />
            </Segment>
            <Segment style={style}>
              <UploadID />
            </Segment>
            <Segment style={style}>
              <UploadAddress />
            </Segment>
          </Segment.Group>
        ) : (
          <LoadingSection />
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Verify);
