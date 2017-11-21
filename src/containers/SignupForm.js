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

class SignupForm extends Component {
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
            Sign up to Coach Jenny
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' placeholder='Jane Doe' name='name' error={!!errors.firstName} onChange={this.onChange}/>

              <Form.Input fluid icon='mail' placeholder='E-mail address' name='email' error={!!errors.email} onChange={this.onChange}/>

              <Form.Input fluid icon='lock' placeholder='Password' type='password' name='password' error={!!errors.password} onChange={this.onChange}/>

              <Button color='teal' fluid size='large' onClick={this.onSubmit}>Signup</Button>
            </Segment>
          </Form>
          <Message>
            Already a member?
            <a href='/login'>{' '} Login instead</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>)
  }
}
// <Form className='centered'>
//     <Form.Field error={!!errors.firstName}>
//       <label htmlFor="firstName">Email</label>
//       <input type="text" name="firstName" placeholder="Jon" value={data.firstName} onChange={this.onChange} />
//       {errors.firstName && <InlineMessage text={errors.firstName} />}
//     </Form.Field>
//
//     <Form.Field error={!!errors.lastName}>
//       <label htmlFor="lastName">Email</label>
//       <input type="text" name="lastName" placeholder="Doe" value={data.lastName} onChange={this.onChange} />
//       {errors.lastName && <InlineMessage text={errors.lastName} />}
//     </Form.Field>
//
//     <Form.Field error={!!errors.email}>
//       <label htmlFor="email">Email</label>
//       <input type="email" name="email" placeholder="name@example.com" value={data.email} onChange={this.onChange} />
//       {errors.email && <InlineMessage text={errors.email} />}
//     </Form.Field>
//
//     <Form.Field error={!!errors.password}>
//       <label htmlFor="password">Password</label>
//       <input type="password" name="password" value={data.password} onChange={this.onChange} placeholder="Password"/>
//       {errors.password && <InlineMessage text={errors.password} />}
//     </Form.Field>
//
//     <Button primary onClick={this.onSubmit}>Login <Icon name='send'></Icon></Button>
//   </Form>)
export default SignupForm;
