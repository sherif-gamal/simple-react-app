import React, { Component } from "react";
import { Menu, Icon, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LOG_OUT } from "../constants";

class Header extends Component {
  handleItemClicked = (e, { name }) => {
    if (name === "logout") {
      this.props.logout();
    }
    if (name === "search") {
      // this.props.history.push('/');
      if (this.props.loggedIn) this.setState({ searching: true });
    }
  };

  render() {
    const { loggedIn } = this.props;
    return (
      <Menu
        style={{
          marginBottom: "40px",
          backgroundColor: "#484e6d",
          color: "white"
        }}
      >
        <Menu.Item position="left" name="bars" onClick={this.handleItemClicked}>
          <Icon inverted size="big" name="bars" style={{ cursor: "pointer" }} />
        </Menu.Item>
        <Menu.Item
          position="right"
          name="search"
          onClick={this.handleItemClicked}
        >
          <Icon
            inverted
            size="big"
            name="search"
            style={{ cursor: "pointer" }}
          />
        </Menu.Item>
        {loggedIn ? null : (
          <Menu.Item>
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {loggedIn ? (
          <Menu.Item name="logout" onClick={this.handleItemClicked}>
            <button className="button primary">Logout</button>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link to="/signup">Signup</Link>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch({ type: LOG_OUT });
  }
});

export default connect(null, mapDispatchToProps)(Header);
