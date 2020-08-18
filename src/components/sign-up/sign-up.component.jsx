import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

class SignUp extends React.Component {
  render() {
    const { switchContent } = this.props;
    return (
      <div className="auth-form-wrapper">
        <div className="auth-title">
          <h3 className="heading-3">Welcome to space chat !</h3>
          <p style={{ fontWeight: 400 }}>Sign up to join the chat </p>
        </div>
        <form action="#" className="auth-form-container">
          <TextField
            className="auth-field"
            name="username"
            label="username"
            type="text"
            required
          />
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
          <TextField
            className="auth-field"
            name="password"
            label="Confirm password"
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
              Sign Up
            </Button>
          </div>
          <p style={{ marginTop: 10 }}>
            Already have an account ?{" "}
            <Link onClick={switchContent} style={{ cursor: "pointer" }}>
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
