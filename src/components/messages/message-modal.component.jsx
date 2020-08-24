import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import mime from "mime-types";

class MessageModal extends React.Component {
  state = {
    open: false,
    file: null,
    authorized: ["image/jpeg", "image/png", "image/jpg"],
  };
  addFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };
  clearFile = () => {
    this.setState({
      file: null,
    });
  };
  isFileAuthorized = (filename) => {
    return this.state.authorized.includes(mime.lookup(filename));
  };
  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, handleClose } = this.props;
    if (file) {
      if (this.isFileAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        this.clearFile();
        handleClose();
      }
    }
  };
  render() {
    const { open, handleClose } = this.props;
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Select an image file !
          </DialogTitle>
          <DialogContent className="side-modal-form">
            <input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={this.addFile}
            />
          </DialogContent>
          <DialogActions style={{ paddingBottom: "20px" }}>
            <Button
              startIcon={<CheckIcon />}
              variant="outlined"
              onClick={this.sendFile}
              style={{ textTransform: "none" }}
              color="primary"
            >
              Add
            </Button>
            <Button
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={handleClose}
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

export default MessageModal;
