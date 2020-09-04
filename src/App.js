import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./route/privateRoute";
import history from "./history";
import "./App.styles.scss";
import firebase from "./firebase";

import AuthPage from "./pages/signInSignUp/signInSignUp.component";
import MainPage from "./pages/main-page/main-page.component";
import LoadingFrame from "./components/loading-frame/loading-frame.component";
import ErrorBoundadry from "./components/error-boundary/error-boundary.component";
import PageNotFound from "./components/error-notfound/error-notfound.component";

import { connect } from "react-redux";
import { setUser, clearUser, signIn } from "./redux/auth/auth.actions";

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        if (user.uid) {
          this.props.signIn(user.uid);
          history.push("/main-page");
        }
      } else {
        this.props.clearUser();
        history.push("/");
      }
    });
  }
  render() {
    const { isLoading } = this.props;
    return (
      <Router history={history}>
        {isLoading ? (
          <LoadingFrame />
        ) : (
          <ErrorBoundadry>
            <Switch>
              <Route path="/" exact component={AuthPage} />
              <PrivateRoute component={MainPage} path="/main-page" exact />
              <Route exact path="*" component={PageNotFound}/>
            </Switch>
          </ErrorBoundadry>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
});
export default connect(mapStateToProps, { setUser, clearUser, signIn })(App);
