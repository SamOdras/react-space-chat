import React from "react";
import firebase from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import CircularProgress from "@material-ui/core/CircularProgress";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    open: false,
    loading: false,
  };
  isEmpty = ({ email, password }) => email && password;

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (this.isEmpty(this.state)) {
      this.setState({ loading: true, error: "", open: false });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("Signed In");
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            error: err.message,
            open: true,
          });
        });
    }
  };
  render() {
    const { switchContent } = this.props;
    const { open, error, loading } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={error}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <div className="auth-form-wrapper">
          <div className="auth-title">
            <h3 className="heading-3">Welcome to space chat !</h3>
            <p style={{ fontWeight: 400 }}>Sign in to join the chat </p>
          </div>
          <form
            action="#"
            className="auth-form-container"
            onSubmit={this.handleSubmit}
          >
            <TextField
              className="auth-field"
              name="email"
              label="Email"
              type="email"
              required
              onChange={this.handleChange}
            />
            <TextField
              className="auth-field"
              name="password"
              label="Password"
              type="password"
              required
              onChange={this.handleChange}
            />
            <div className="auth-button-group">
              <Button
                variant="contained"
                type="submit"
                size="large"
                color="primary"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "white" }} />
                ) : (
                  "Sign in"
                )}
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
      </React.Fragment>
    );
  }
}

export default SignIn;
