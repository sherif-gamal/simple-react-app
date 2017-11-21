import React, { Component } from 'react'
import { Menu, Icon, Input } from 'semantic-ui-react'

export default class MenuExampleBasic extends Component {
  constructor(props) {
    super();
    console.log(props);
    this.state = {
      searching: false,
      loggedIn: props.loggedIn
    }
  }

  handleItemClicked = (e, { name }) => {
    if(name === 'search') {
      // this.props.history.push('/');
      if (this.state.loggedIn)
        this.setState({searching: true});
    }
  }

  render() {
    const { searching, loggedIn } = this.state;
    console.log(this.props);
    return (
      <Menu>
        {(searching &&
          <Menu.Item
            className="fluid" style={searching ? {width: "100%"} : {}}
          >
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>)
        ||

        <Menu.Item position='right' name="search" onClick={this.handleItemClicked}>
          <Icon name="search" style={{cursor: 'pointer'}} />
        </Menu.Item>
      }
      </Menu>
    )
  }
}
