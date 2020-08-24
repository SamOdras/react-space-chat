import React from "react";
import firebase from "../../firebase";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UploadForm from "./message-modal.component";

import UploadIcon from "@material-ui/icons/CloudUpload";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import uuidv4 from "uuid/dist/v4";
import LinearProgress from "@material-ui/core/LinearProgress";
class MessageForm extends React.Component {
  state = {
    storageRef: firebase.storage().ref(),
    messageRef: firebase.database().ref("messages"),
    messageContent: "",
    isUploading: false,
    uploadingTask: null,
    uploadPercentage: 0,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    modal: false,
    error: "",
    open: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
  closeModal = () => {
    this.setState({
      modal: false,
      error: "",
    });
  };

  createMessage = (fileUrl = null) => {
    const { messageContent, user } = this.state;
    const messagePayload = {
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    if (fileUrl !== null) {
      messagePayload["image"] = fileUrl;
    } else {
      messagePayload["content"] = messageContent;
    }
    return messagePayload;
  };
  sendMessage = (e) => {
    e.preventDefault();
    const { messageContent, messageRef, channel } = this.state;
    if (messageContent.length > 0) {
      this.setState({ loading: true, error: "", messageContent:""  });
      messageRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, error: "", messageContent:"" });
        })
        .catch((err) => {
          console.error(err.message);
          this.setState({
            loading: false,
            modal: true,
            error: err.message,
          });
        });
    }
  };
  sendFileMessage = (url) => {
    const { channel } = this.state;
    const ref = this.props.messageRef;
    ref
      .child(channel.id)
      .push()
      .set(this.createMessage(url))
      .then(() => {
        this.setState({
          isUploading: false,
        });
      })
      .catch((err) => {
        console.error(err.message);
        this.setState({
          modal: true,
          error: err.message,
          isUploading: false,
        });
      });
  };
  getFileStoragePath = () => {
    return "chat/public";
  };
  uploadFile = (file, metadata) => {
    const filePath = `${this.getFileStoragePath()}/${uuidv4()}.jpg`;
    this.setState(
      {
        isUploading: true,
        uploadingTask: this.state.storageRef
          .child(filePath)
          .put(file, metadata),
      },
      () => {
        this.state.uploadingTask.on(
          "state_changed",
          (snap) => {
            const uploadPercentage = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ uploadPercentage });
          },
          (err) => {
            console.error(err.message);
            this.setState({
              modal: true,
              error: err.message,
            });
          },
          () => {
            this.state.uploadingTask.snapshot.ref
              .getDownloadURL()
              .then((url) => {
                this.sendFileMessage(url);
              })
              .catch((err) => {
                console.error(err.message);
                this.setState({
                  modal: true,
                  error: err.message,
                });
              });
          }
        );
      }
    );
  };

  render() {
    const {
      loading,
      modal,
      error,
      isUploading,
      uploadPercentage,
      open,
    } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={modal}
          autoHideDuration={6000}
          onClose={this.closeModal}
          message={error}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closeModal}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <form action="#" onSubmit={this.sendMessage} className="message-form">
          <TextField
            name="messageContent"
            className="message-text-field"
            variant="outlined"
            placeholder="Write your message"
            onChange={this.handleChange}
            value={this.state.messageContent}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <AddIcon style={{ color: "grey", marginRight: "5px" }} />
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup
            variant="contained"
            color="primary"
            className="message-button"
          >
            <Button
              style={{
                textTransform: "none",
              }}
              startIcon={<EditIcon />}
              type="submit"
              disabled={loading}
            >
              Add Reply
            </Button>
            <Button
              endIcon={isUploading ? "" : <UploadIcon />}
              onClick={this.handleClickOpen}
              disabled={isUploading}
              style={{
                textTransform: "none",
              }}
            >
              {isUploading ? "loading..." : "Upload Media"}
            </Button>
            <UploadForm
              uploadFile={this.uploadFile}
              open={open}
              handleClose={this.handleClose}
            />
          </ButtonGroup>
          {isUploading && (
            <LinearProgress
              variant="buffer"
              value={uploadPercentage}
              valueBuffer={uploadPercentage + 20}
            />
          )}
        </form>
      </React.Fragment>
    );
  }
}

export default MessageForm;
