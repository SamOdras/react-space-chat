import React from "react";
import firebase from "../../firebase";
import AddChannelButton from "./side-modal";

import CompareArrows from "@material-ui/icons/CompareArrows";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

import { connect } from "react-redux";
import {
  setCurrentChannel,
  setPrivateChannel,
  setStarredChannel,
} from "../../redux/channel/channel.actions";

class Channels extends React.Component {
  state = {
    listChannels: [],
    notifications: [],
    currentChannelId: "",
    currentChannel: null,
    loadingFirstChannel: true,
    user: this.props.currentUser,
    channelsRef: firebase.database().ref("channels"),
    messageRef: firebase.database().ref("messages"),
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
      this.notificationsListener(snap.key);
    });
  };
  notificationsListener = (channelId) => {
    const { messageRef } = this.state;
    messageRef.child(channelId).on("value", (snap) => {
      if (this.state.currentChannel) {
        this.notificationsHandler(
          channelId,
          this.state.currentChannel.id,
          this.state.notifications,
          snap
        );
      }
    });
  };
  notificationsHandler = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;
    let index = notifications.findIndex((notif) => channelId === notif.id);
    if (index !== -1) {
      if (channelId !== currentChannelId) {
        lastTotal = notifications[index].total;
        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        count: 0,
        id: channelId,
        lastKnownTotal: snap.numChildren(),
        total: snap.numChildren(),
      });
    }
    this.setState({ notifications });
  };
  removeNotifications = () => {
    const { notifications, currentChannelId } = this.state;
    let index = notifications.findIndex(
      (notif) => notif.id === currentChannelId
    );
    let notificationUpdate = [...notifications];
    if (index !== -1) {
      notificationUpdate[index].count = 0;
      notificationUpdate[index].total =
        notificationUpdate[index].lastKnownTotal;
      this.setState({
        notifications: notificationUpdate,
      });
    }
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
    const { listChannels, currentChannelId, notifications } = this.state;
    const { isPrivateChannel, isStarredChannel } = this.props;
    return (
      listChannels.length > 0 &&
      listChannels.map((item, key) => {
        return (
          <div
            onClick={() => this.changeChannel(item)}
            className={
              !isStarredChannel && !isPrivateChannel && item.id === currentChannelId
                ? "content-active"
                : "content-item"
            }
            key={item.id}
          >
            <p>#{item.name}</p>
            {notifications[key] && notifications[key].count ? (
              <div className="status-notifications">
                {notifications[key].count}
              </div>
            ) : (
              ""
            )}
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
    this.props.setPrivateChannel(false);
    this.props.setStarredChannel(false);
    this.setActiveChannel(channel);
    this.removeNotifications();
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
          <Tooltip title="Click to add more channel" arrow placement="right">
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
          </Tooltip>
          {this.displayChannel()}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel, setStarredChannel })(
  Channels
);
