import React from "react";
import firebase from "../../firebase";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import "./messages.styles.scss";
import MessageForm from "./message-form.component";
import MessageHeader from "./message-header.component";

class Messages extends React.Component {
  state = {
    isPrivateChannel: this.props.isPrivateChannel,
    privateMessageRef: firebase.database().ref("privateMessages"),
    messageRef: firebase.database().ref("messages"),
    listMessages: [],
    loadingListMessages: true,
    user: this.props.currentUser,
    channel: this.props.currentChannel,
  };
  componentDidMount() {
    const { channel } = this.state;
    channel && this.messageListener(channel.id);
  }

  messageListener = (channelId) => {
    let loadedMessages = [];
    this.state.messageRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        listMessages: loadedMessages,
        loadingListMessages: false,
      });
    });
  };
  displayMessageType = (message) => {
    let isImage =
      message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    if (isImage) {
      return (
        <div className="message-image">
          <img src={message.image} alt={message} style={{width:'100%'}}/>
        </div>
      );
    } else {
      return <p>{message.content}</p>;
    }
  };
  displayMessages = () => {
    const { listMessages, user } = this.state;
    return (
      listMessages.length > 0 &&
      listMessages.map((item, key) => {
        return (
          <div className="message-item" key={key}>
            <Avatar variant="rounded" src={item.user.avatar} />
            <div
              className={
                user.uid === item.user.id
                  ? "message-item__content-self"
                  : "message-item__content-other"
              }
            >
              <Link>{item.user.name}</Link>
              <small>{moment(item.timeStamp).fromNow()}</small>
              {this.displayMessageType(item)}
            </div>
          </div>
        );
      })
    );
  };
  messageRef = () => {
    const { isPrivateChannel, privateMessageRef, messageRef } = this.state;
    return isPrivateChannel ? privateMessageRef : messageRef;
  };
  render() {
    const { channel, user, isPrivateChannel } = this.state;
    return (
      <div className="messages-container">
        <MessageHeader currentUser={user} currentChannel={channel} isPrivateChannel={isPrivateChannel} />
        <Paper className="message-panel">{this.displayMessages()}</Paper>
        <Paper className="message-input">
          <MessageForm
            currentUser={user}
            currentChannel={channel}
            messageRef={this.messageRef()}
          />
        </Paper>
      </div>
    );
  }
}

export default Messages;
