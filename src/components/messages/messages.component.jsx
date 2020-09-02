import React from "react";
import firebase from "../../firebase";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import "./messages.styles.scss";
import MessageForm from "./message-form.component";
import MessageHeader from "./message-header.component";
import { connect } from 'react-redux';
import { setUserTotalPosts } from '../../redux/channel/channel.actions';

class Messages extends React.Component {
  state = {
    isPrivateChannel: this.props.isPrivateChannel,
    privateMessageRef: firebase.database().ref("privateMessages"),
    messageRef: firebase.database().ref("messages"),
    searchMessage: "",
    searchResults: [],
    searchLoading: false,
    listMessages: [],
    loadingListMessages: true,
    totalUsers: 0,
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    channel: this.props.currentChannel,
    isChannelStarred: false, 
  };
  componentDidMount() {
    const { channel, user } = this.state;
    if(channel && user){
      this.messageListener(channel.id);
      this.starListener();
    }
  }

  searchMessage = () => {
    const { searchMessage, listMessages } = this.state;
    const channelMessages = [...listMessages];
    const regex = new RegExp(searchMessage, "gi");
    const searchResults = channelMessages.reduce((acc, messages) => {
      if (
        (messages.content && messages.content.match(regex)) ||
        messages.user.name.match(regex)
      ) {
        acc.push(messages);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => {
      this.setState({ searchLoading: false });
    }, 1000);
  };
  handleChange = (e) => {
    this.setState(
      {
        searchMessage: e.target.value,
        searchLoading: true,
      },
      () => this.searchMessage()
    );
  };
  handleStar = () => {
    this.setState({
      isChannelStarred: !this.state.isChannelStarred
    }, () => this.starChannel() )
  }
  messageListener = (channelId) => {
    let loadedMessages = [];
    this.messageRef()
      .child(channelId)
      .on("child_added", (snap) => {
        loadedMessages.push(snap.val());
        this.setState({
          listMessages: loadedMessages,
          loadingListMessages: false,
        });
        this.countTotalUser(loadedMessages);
        this.countTotalUserPosts(loadedMessages);
      });
  };

  starChannel = () => {
    const { isChannelStarred, usersRef, channel, user } = this.state;
    if(isChannelStarred){
      usersRef
        .child(`${user.uid}/starred`)
        .update({
          [channel.id]:{
            name: channel.name, 
            details: channel.details,
            createdBy: {
              name: channel.createdBy.name,
              avatar: channel.createdBy.avatar
            }
          }
        })
    } else {
      usersRef
        .child(`${user.uid}/starred`)
        .child(channel.id)
        .remove(err => {
          if(err !== null){
            console.error(err.message)
          }
        })
    }
  }
  starListener = () => {
    const { usersRef, user, channel } = this.state;
    usersRef
      .child(user.uid)
      .child("starred")
      .once("value")
      .then(data => {
        if(data.val() !== null){
          const listChannelId = Object.keys(data.val());
          const isChannelStarred = listChannelId.includes(channel.id);
          this.setState({ isChannelStarred })
        }
      })
      
  }

  countTotalUser = (loadedMessages) => {
    let totalUniqueUser = loadedMessages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    this.setState({ totalUsers: totalUniqueUser.length });
  };
  countTotalUserPosts = loadedMessages => {
    let total = loadedMessages.reduce((acc, messages) => {
      if(messages.user.name in acc){
        acc[messages.user.name].count += 1;
      } else {
        acc[messages.user.name] = {
          count: 1,
          avatar: messages.user.avatar,
        }
      }
      return acc;
    }, {})
    this.props.setUserTotalPosts(total);
  }

  displayMessageType = (message) => {
    let isImage =
      message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    if (isImage) {
      return (
        <div className="message-image">
          <img src={message.image} alt={message} style={{ width: "100%" }} />
        </div>
      );
    } else {
      return <p>{message.content}</p>;
    }
  };
  displayMessages = (listMessages) => {
    const { user } = this.state;
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
    const {
      channel,
      user,
      isPrivateChannel,
      totalUsers,
      searchLoading,
      searchResults,
      listMessages,
      searchMessage,
      isChannelStarred
    } = this.state;
    return (
      <div className="messages-container">
        <MessageHeader
          totalUsers={totalUsers}
          currentUser={user}
          currentChannel={channel}
          isPrivateChannel={isPrivateChannel}
          handleChange={this.handleChange}
          isLoading={searchLoading}
          isChannelStarred={isChannelStarred}
          handleStar={this.handleStar}
        />
        <Paper className="message-panel">
          {searchMessage
            ? this.displayMessages(searchResults)
            : this.displayMessages(listMessages)}
        </Paper>
        <Paper className="message-input">
          <MessageForm
            currentUser={user}
            currentChannel={channel}
            messageRef={this.messageRef}
            isPrivateChannel={isPrivateChannel}
          />
        </Paper>
      </div>
    );
  }
}

export default connect(null, { setUserTotalPosts })(Messages);
