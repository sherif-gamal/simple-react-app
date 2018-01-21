import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import "../styles/homePage.css";

const LoggedInHome = () => <div>Welcome to Bitmate</div>;

const NonLoggedInHome = () => (
  <div>
    <Form>
      <Form.Group
        style={{
          padding: "20px",
          margin: "auto",
          justifyContent: "center"
        }}
      >
        <Form.Input
          style={{ width: "300px", height: "55px" }}
          placeholder="Email Address"
          onChange={(e, { value }) => this.setState({ emailAddress: value })}
        />
        <Button
          type="submit"
          primary
          className="huge"
          style={{ border: "1px solid" }}
          onClick={this.getStarted}
        >
          Get Started
        </Button>
      </Form.Group>
    </Form>
  </div>
);

class HomePage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };
  state = {
    emailAddress: ""
  };

  getStarted = () => {
    this.props.history.push({
      pathname: "/signup",
      state: { emailAddress: this.state.emailAddress }
    });
  };

  render() {
    const { token } = this.props;
    return (
      <main style={{ textAlign: "center" }}>
        <h1>The easiest way to buy and sell cryptocurrency in Australia</h1>

        <div
          style={{
            margin: "auto",
            background: "#2185d0",
            width: "50%"
          }}
        >
          {token ? <LoggedInHome /> : <NonLoggedInHome />}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps)(HomePage);
