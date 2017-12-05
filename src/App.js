import React, { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./components/Header";
import { LoginPage, SignupPage, PageNotFound } from "./containers";
import HomePage from "./components/HomePage";
import Coins from "./containers/Coins";
import history from "./utils/history";
import styles from "./styles";

class App extends PureComponent {
  render() {
    return (
      <div style={{ background: styles.themeColor }}>
        <Header history={history} loggedIn={this.props.loggedIn} />
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/coins" component={Coins} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);
