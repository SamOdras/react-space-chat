import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import "./App.styles.scss";
import firebase from "./firebase";

import AuthPage from "./pages/signInSignUp/signInSignUp.component";
import MainPage from "./pages/main-page/main-page.component";
import LoadingFrame from "./components/loading-frame/loading-frame.component";

import { connect } from "react-redux";
import { setUser, clearUser } from "./redux/auth/auth.actions";

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user);
        history.push("/");
      } else {
        this.props.clearUser();
        history.push("/auth");
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
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/auth" exact component={AuthPage} />
          </Switch>
        )}
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
});
export default connect(mapStateToProps, { setUser, clearUser })(App);
