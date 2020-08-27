import React from "react";
import firebase from "../../firebase";
import AddChannelButton from "./side-modal";

import CompareArrows from "@material-ui/icons/CompareArrows";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { setCurrentChannel, setPrivateChannel } from "../../redux/channel/channel.actions";

class Channels extends React.Component {
  state = {
    listChannels: [],
    currentChannelId: "",
    currentChannel: null,
    loadingFirstChannel: true,
    user: this.props.currentUser,
    channelsRef: firebase.database().ref("channels"),
    channelName: "",
    channelDetails: "",
    modal: false,
    modalMessages: "",
  };

  componentDidMount() {
    this.addListener();
  }
  componentWillUnmount() {
    this.removeListener();
  }
  addListener = () => {
    let loadedChannel = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannel.push(snap.val());
      this.setState({ listChannels: loadedChannel }, () =>
        this.setFirstChannel()
      );
    });
  };
  removeListener = () => {
    this.state.channelsRef.off();
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
  displayChannel = () => {
    const { listChannels, currentChannelId } = this.state;
    const { isPrivateChannel } = this.props;
    return (
      listChannels.length > 0 &&
      listChannels.map((item) => {
        return (
          <div
            onClick={() => this.changeChannel(item)}
            className={
              !isPrivateChannel && item.id === currentChannelId
                ? "content-active"
                : "content-item"
            }
            key={item.id}
          >
            #{item.name}
          </div>
        );
      })
    );
  };
  setFirstChannel = () => {
    const { listChannels, loadingFirstChannel } = this.state;
    const firstChannel = listChannels[0];
    if (loadingFirstChannel && listChannels.length > 0) {
      this.props.setCurrentChannel(firstChannel);
      this.setActiveChannel(firstChannel);
      this.setState({ currentChannel: firstChannel });
    }
    this.setState({
      loadingFirstChannel: false,
    });
  };
  setActiveChannel = (channel) => {
    this.setState({
      currentChannelId: channel.id,
    });
  };
  changeChannel = (channel) => {
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false)
    this.setActiveChannel(channel);
    this.setState({ currentChannel: channel });
  };
  render() {
    const {
      modal,
      modalMessages,
      channelName,
      channelDetails,
      listChannels,
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
            <p>CHANNELS({listChannels && listChannels.length})</p>
            <AddChannelButton
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              channelName={channelName}
              channelDetails={channelDetails}
            />
          </div>
          {this.displayChannel()}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Channels);
