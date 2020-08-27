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
    userList: [],
    activeChannel: "",
  };
  componentDidMount() {
    this.userListener();
  }
  userListener = () => {
    let loadedUser = [];
    const { user } = this.state;
    this.state.userRef.on("child_added", (snap) => {
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
  };
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
            @{item.name}
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
  changeChannel = user => {
    const { setCurrentChannel, setPrivateChannel } = this.props;
    const privateChannelPayload = {
      id: this.createChannelId(user.uid),
      name: user.name,
    };
    setCurrentChannel(privateChannelPayload);
    setPrivateChannel(true)
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
