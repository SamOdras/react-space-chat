import React from "react";
import MessageIcon from "@material-ui/icons/Message";
import firebase from "../../firebase";
import { connect } from "react-redux";
import {
  setCurrentChannel,
  setPrivateChannel,
} from "../../redux/channel/channel.actions";

class DirectMessages extends React.Component {
  state = {
    user: this.props.currentUser,
    isPrivateChannel: this.props.isPrivateChannel,
    userRef: firebase.database().ref("users"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
    userList: [],
    activeChannel: "",
  };
  componentDidMount() {
    this.userListener();
  }
  userListener = () => {
    let loadedUser = [];
    const { user, userRef, connectedRef, presenceRef } = this.state;
    userRef.on("child_added", (snap) => {
      if (user.uid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        user["status"] = "offline";
        loadedUser.push(user);
        this.setState({
          userList: loadedUser,
        });
      }
    });
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(user.uid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.error(err.message);
          }
        });
      }
    });
    presenceRef.on("child_added", (snap) => {
      if (user.uid !== snap.key) {
        this.addUserStatus(snap.key);
      }
    });
    presenceRef.on("child_removed", (snap) => {
      if (user.uid !== snap.key) {
        this.addUserStatus(snap.key, false);
      }
    });
  };
  addUserStatus = (userId, connected = true) => {
    const updateUsers = this.state.userList.reduce((acc, user) => {
      if(userId === user.uid){
        user['status'] = connected ? "online" : "offline";
      }
      return acc.concat(user)
    },[]);
    this.setState({ userList: updateUsers })
  }
  userDisplay = () => {
    const { userList, activeChannel } = this.state;
    const { isPrivateChannel } = this.props;
    return (
      userList.length > 0 &&
      userList.map((item) => {
        return (
          <div
            key={item.uid}
            onClick={() => this.changeChannel(item)}
            className={
              isPrivateChannel && activeChannel === item.uid
                ? "content-active"
                : "content-item"
            }
          >
            <p>@{item.name}</p>
            <div className={item.status === "online" ? "status-online" : "status-offline"}></div>
          </div>
        );
      })
    );
  };

  createChannelId = (userId) => {
    const currentUserId = this.state.user.uid;
    return userId < currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };
  changeChannel = (user) => {
    const { setCurrentChannel, setPrivateChannel } = this.props;
    const privateChannelPayload = {
      id: this.createChannelId(user.uid),
      name: user.name,
    };
    setCurrentChannel(privateChannelPayload);
    setPrivateChannel(true);
    this.setState({ activeChannel: user.uid });
  };
  render() {
    const { userList } = this.state;
    return (
      <div className="sidepanel-content__users">
        <div className="divider-title">
          <MessageIcon className="divider-title__icon " />
          <p>DIRRECT MESSAGES({userList.length})</p>
        </div>
        {this.userDisplay()}
      </div>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(
  DirectMessages
);
