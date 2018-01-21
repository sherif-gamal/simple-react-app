import React, { Component } from "react";
import {
  Form,
  Button,
  Grid,
  Header,
  Segment,
  Message
} from "semantic-ui-react";
import validator from "validator";
import InlineMessage from "../components/InlineMessage";

class LoginForm extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email))
      errors.email = "Please enter a valid email address";
    if (!data.password) errors.password = "Please enter a password";
    return errors;
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={{
            height: "100%"
          }}
          verticalAlign="middle"
        >
          <Grid.Column
            style={{
              maxWidth: 600
            }}
          >
            <h2>Login to Bitmate</h2>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  placeholder="E-mail address"
                  name="email"
                  error={!!errors.email}
                  onChange={this.onChange}
                />

                <Form.Input
                  fluid
                  icon="lock"
                  placeholder="Password"
                  type="password"
                  name="password"
                  error={!!errors.password}
                  onChange={this.onChange}
                />
                <Button primary fluid size="large" onClick={this.onSubmit}>
                  Submit
                </Button>
                {this.props.error && (
                  <Message negative>
                    <Message.Header>
                      There was a problem logging you in
                    </Message.Header>
                    <p>{this.props.error}</p>
                  </Message>
                )}
              </Segment>
            </Form>
            <a href="/signup">Create an account instead</a>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default LoginForm;
