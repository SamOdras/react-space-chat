import React from "react";
import firebase from "../../firebase";
import AddChannelButton from "./side-modal";

import CompareArrows from "@material-ui/icons/CompareArrows";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { setCurrentChannel } from "../../redux/channel/channel.actions";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channelsRef: firebase.database().ref("channels"),
    channelName: "",
    channelDetails: "",
    modal: false,
    modalMessages: "",
  };
  isFormValid = ({ channelDetails, channelName }) =>
    channelName && channelDetails;
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };
  addChannel = () => {
    const { user, channelsRef, channelName, channelDetails } = this.state;
    const key = channelsRef.push().key;
    const channelPayload = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(channelPayload)
      .then(() => {
        this.openModal("Channel created !");
        this.setState({ channelName: "", channelDetails: "" });
      })
      .catch((err) => {
        this.openModal(err.message);
        console.error(err);
      });
  };
  closeModal = () => {
    this.setState({
      modal: false,
      modalMessages: "",
    });
  };
  openModal = (messages) => {
    this.setState({
      modal: true,
      modalMessages: messages,
    });
  };
  render() {
    const { modal, modalMessages, channelName, channelDetails } = this.state;
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
          message={modalMessages}
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
        <div
          className="sidepanel-content__channels"
          style={{ marginBottom: "30px" }}
        >
          <div className="divider-title">
            <CompareArrows className="divider-title__icon" />
            <p>CHANNELS(2)</p>
            <AddChannelButton
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              channelName={channelName}
              channelDetails={channelDetails}
            />
          </div>
          <div className="content-item">#React Channel</div>
          <div className="content-item">#Vue Channel</div>
          <div className="content-item">#Kotlin Channel</div>
          <div className="content-item">#Android Channel</div>
          <div className="content-item">#Php Channel</div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel })(Channels);
