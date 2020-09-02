import React from "react";
import firebase from "../../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import md5 from "md5";
import CircularProgress from "@material-ui/core/CircularProgress";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    open: false,
    loading: false,
    error: "",
    userRef: firebase.database().ref("users"),
  };
  isFormValid = () => {
    let error = "";
    if (this.isFormEmpty(this.state)) {
      error = "Fill in all fields";
      this.setState({
        error: error,
        open: true,
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      return false;
    } else {
      return true;
    }
  };
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      this.setState({
        error: "Password length less than 6 characters",
        open: true,
      });
      return false;
    } else if (password !== passwordConfirmation) {
      this.setState({
        error: "Password doesn't match",
        open: true,
      });
      return false;
    }
    return true;
  };
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  saveUser = (createdUser) => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    if (this.isFormValid()) {
      this.setState({ loading: true, error: "", open: false });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          console.log("User Created");
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => console.log("User Saved"));
            })
            .catch((err) => {
              console.error(err);
              this.setState({
                loading: false,
                error: err.message,
                open: true,
              });
            });
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
            <p style={{ fontWeight: 400 }}>Sign up to join the chat </p>
          </div>
          <form onSubmit={this.handleSubmit} action="#" className="auth-form-container">
            <TextField
              className="auth-field"
              name="username"
              label="Username"
              type="text"
              required
              onChange={this.handleChange}
            />
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
            <TextField
              className="auth-field"
              name="passwordConfirmation"
              label="Confirm password"
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
                  "Register"
                )}
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
      </React.Fragment>
    );
  }
}

export default SignUp;
