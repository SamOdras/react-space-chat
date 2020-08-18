import React from "react";
import "./sign-in-up.styles.scss";

import SignInPage from "../../components/sign-in/sign-in.component";
import SignUpPage from "../../components/sign-up/sign-up.component";

import { ReactComponent as LoginBackground } from "../../assets/astrounot.svg";

class Auth extends React.Component {
  state = {
    toogle: false,
  };
  toogleComponent = () => {
    this.setState({
      toogle: !this.state.toogle,
    });
  };
  renderComponent = () => {
    if (!this.state.toogle) {
      return <SignInPage switchContent={this.toogleComponent} />;
    }
    return <SignUpPage switchContent={this.toogleComponent} />;
  };
  render() {
    return (
      <div className="signInSignUp-container">
        <LoginBackground className="signInSignUp-background" />
        {this.renderComponent()}
      </div>
    );
  }
}

export default Auth;
