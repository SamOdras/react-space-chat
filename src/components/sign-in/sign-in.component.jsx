import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

class SignIn extends React.Component {
  render() {
    const { switchContent } = this.props;
    return (
      <div className="auth-form-wrapper">
        <div className="auth-title">
          <h3 className="heading-3">Welcome to space chat !</h3>
          <p style={{ fontWeight: 400 }}>Sign in to join the chat </p>
        </div>
        <form action="#" className="auth-form-container">
          <TextField
            className="auth-field"
            name="email"
            label="Email"
            type="email"
            required
          />
          <TextField
            className="auth-field"
            name="password"
            label="Password"
            type="password"
            required
          />
          <div className="auth-button-group">
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="primary"
            >
              Sign In
            </Button>
          </div>
          <p style={{ marginTop: 10 }}>
            Don't have any account ?{" "}
            <Link onClick={switchContent} style={{ cursor: "pointer" }}>
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
