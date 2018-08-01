import React, { Component } from "react";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import PropTypes from "prop-types";
import validator from "validator";
import InlineMessage from "../components/InlineMessage";

class SignupForm extends Component {
  static propTypes = {
    prefilledEmail: PropTypes.string,
    signupError: PropTypes.string,
    submit: PropTypes.func.isRequired
  };

  static defaultProps = {
    prefilledEmail: null,
    signupError: null
  };
  state = {
    data: {
      name: "",
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
    const { prefilledEmail, signupError } = this.props;
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
            <h2>Sign up to Bitmate</h2>
            <Form size="large">
              <Segment stacked>
                <Form.Group widths="equal">
                  <Form.Input
                    icon="user"
                    placeholder="Jane"
                    name="firstName"
                    error={!!errors.firstName}
                    onChange={this.onChange}
                  />
                  <Form.Input
                    icon="user"
                    placeholder="Doe"
                    name="lastName"
                    error={!!errors.lastName}
                    onChange={this.onChange}
                  />
                </Form.Group>

                <Form.Input
                  fluid
                  icon="mail"
                  placeholder="E-mail address"
                  name="email"
                  error={!!errors.email}
                  onChange={this.onChange}
                  defaultValue={prefilledEmail}
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
                  Signup
                </Button>
              </Segment>
            </Form>
            <a href="/login">Login to your account instead</a>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default SignupForm;
