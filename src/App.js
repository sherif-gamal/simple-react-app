import React, { PureComponent } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./components/Header";
import {
  LoginPage,
  SignupPage,
  PageNotFound,
  Verify,
  ProtectedRoute,
  Modals,
  VerifyEmail,
  AdminRoute,
  ManageUsers,
  ManageUser
} from "./containers";
import LoadingSection from "./components/LoadingSection";
import HomePage from "./components/HomePage";
import Coins from "./containers/Coins";
import AccountCreated from "./components/AccountCreated";
import history from "./utils/history";
import styles from "./styles";
import { FETCH_USER } from "./constants";
import "./styles/app.css";

class App extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    fetchUser: PropTypes.func.isRequired,
    appState: PropTypes.shape().isRequired
  };
  static defaultProps = {
    token: null
  };

  componentWillMount() {
    const { token, fetchUser } = this.props;
    if (token) {
      fetchUser();
    }
  }
  render() {
    return this.props.appState.appReady ? (
      <div style={{ background: styles.themeColor }}>
        <Header history={history} loggedIn={!!this.props.token} />
        <div className="ui container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/coins" component={Coins} />
            <Route path="/created" component={AccountCreated} />
            <Route path="/verifyEmail/:token" component={VerifyEmail} />

            <ProtectedRoute
              exact
              path="/verify"
              component={Verify}
              history={history}
            />
            <AdminRoute exact path="/admin/users" component={ManageUsers} />
            <AdminRoute exact path="/admin/users/:id" component={ManageUser} />

            <Route path="*" component={PageNotFound} />
          </Switch>
          <Modals />
        </div>
      </div>
    ) : (
        <div style={{ background: styles.themeColor }} />
      );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch({ type: FETCH_USER })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
