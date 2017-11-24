import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import Header from "./components/Header";
import { HomePage, LoginPage, SignupPage, PageNotFound } from "./containers";

class App extends Component {
  render() {
    return (
      <div>
        <Header loggedIn={!!this.props.user.token} />
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/share" component={() => <strong>I shall display the url here</strong>} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(App);
