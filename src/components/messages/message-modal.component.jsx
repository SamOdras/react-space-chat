import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import UploadIcon from "@material-ui/icons/CloudUpload";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";


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
        <Button
          style={{
            textTransform: "none",
            backgroundColor: "#3f51b5",
            borderColor: "#3f51b5",
            color: "white",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          endIcon={<UploadIcon />}
          onClick={this.handleClickOpen}
        >
          Upload Media
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Select an image file !</DialogTitle>
          <DialogContent className="side-modal-form">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
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
