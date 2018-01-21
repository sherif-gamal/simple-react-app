import React, { Component } from "react";
import { Menu, Icon, Input, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LOG_OUT } from "../constants";
import styles from "../styles";

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
        borderless
        style={{
          marginBottom: "40px",
          background: styles.themeColor
        }}
      >
        <Menu.Item
          as="div"
          position="left"
          name="bars"
          onClick={this.handleItemClicked}
          style={{ color: "white" }}
        >
          <Link to="/">Bitmate</Link>
        </Menu.Item>
        <Menu.Item
          as="div"
          position="right"
          onClick={this.handleItemClicked}
          style={{ color: "white" }}
        >
          <Link to="/coins">Buy/Sell</Link>
        </Menu.Item>
        {loggedIn ? null : (
          <Menu.Item as="div">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {loggedIn ? (
          <Menu.Item as="div" name="logout" onClick={this.handleItemClicked}>
            <Link to="#">Logout</Link>
          </Menu.Item>
        ) : (
          <Menu.Item as="div">
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
