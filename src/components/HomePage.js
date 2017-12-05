import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import "../styles/homePage.css";

class HomePage extends Component {
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
                onChange={(e, { value }) =>
                  this.setState({ emailAddress: value })
                }
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
      </main>
    );
  }
}

export default HomePage;
