import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";

const DialogTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

class AlertDialog extends React.Component {
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleClickOpen}
          className="divider-title__button"
        >
          <AddCircle className="divider-title__icon" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Select an Image File</DialogTitle>
          <DialogContent className="side-modal-form">
            <DialogTextField
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              label="Name of Channel"
            />
            <DialogTextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              label="About the Channel"
            />
          </DialogContent>
          <DialogActions style={{paddingBottom:'20px'}}>
            <Button
              startIcon={<CheckIcon />}
              variant="outlined"
              onClick={this.handleClose}
              style={{ textTransform: "none" }}
              color="primary"
            >
              Add
            </Button>
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={this.handleClose}
              color="secondary"
              style={{
                textTransform: "none",
                marginRight: "15px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AlertDialog;
