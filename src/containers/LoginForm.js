import React, {Component} from 'react';
import {
  Form,
  Button,
  Icon,
  Grid,
  Header,
  Image,
  Segment,
  Message
} from 'semantic-ui-react';
import validator from 'validator';
import InlineMessage from '../components/InlineMessage';

class LoginForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  }

  onChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({errors});
    // if (Object.keys(errors).length === 0) {
    this.props.submit(this.state.data);
    // }
  }

  validate(data) {
    let errors = {};
    validator.isEmail(data.email) || (errors.email = "Please enter a valid email address");
    data.password || (errors.password = "Please enter a password");
    return errors;
  }

  render() {
    const {data, errors} = this.state;
    return (<div>
      <Grid textAlign='center' style={{
          height: '100%'
        }} verticalAlign='middle'>
        <Grid.Column style={{
            maxWidth: 600
          }}>
          <Header as='h2' color='teal' textAlign='center'>
            Login
          </Header>
          <Form size='large'>
            <Segment stacked="stacked">
              <Form.Input fluid="fluid" icon='user' iconPosition='right' placeholder='E-mail address'/>
              <Form.Input fluid="fluid" icon='lock' iconPosition='right' placeholder='Password' type='password'/>

              <Button color='teal' fluid="fluid" size='large'>Login</Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account?
            <a href='/signup'>{' '}Create one here</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>)
  }
}
export default LoginForm;
