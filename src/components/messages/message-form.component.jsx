import React from "react";
import firebase from "../../firebase";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UploadButton from "./message-modal.component";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class MessageForm extends React.Component {
  state = {
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messageContent: "",
    messageRef: firebase.database().ref("messages"),
    loading: false,
    modal: false,
    error: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  closeModal = () => {
    this.setState({
      modal: false,
    })
  }

  createMessage = () => {
    const { messageContent, user } = this.state;
    const messagePayload = {
      content: messageContent,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    return messagePayload;
  };
  sendMessage = (e) => {
    e.preventDefault();
    const { messageContent, messageRef, channel } = this.state;
    if (messageContent.length > 0) {
      this.setState({ loading: true, error: "" });
      messageRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, error: "", messageContent: "" });
        })
        .catch((err) => {
          console.error(err.message);
          this.setState({
            loading: false,
            modal:true,
            error: err.message,
            messageContent: "",
          });
        });
    }
  };

  render() {
    const { loading, modal, error } = this.state;
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
            <UploadButton />
          </ButtonGroup>
        </form>
      </React.Fragment>
    );
  }
}

export default MessageForm;
