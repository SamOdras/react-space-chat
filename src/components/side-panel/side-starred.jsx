import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import {
  setCurrentChannel,
  setPrivateChannel,
  setStarredChannel,
} from "../../redux/channel/channel.actions";
import StarIcon from "@material-ui/icons/Star";

class StarredChannels extends React.Component {
  state = {
    usersRef: firebase.database().ref("users"),
    user: this.props.currentUser,
    currentChannelId: "",
    listStarredChannel: [],
  };
  componentDidMount() {
    if (this.state.user) {
      this.listStarListener();
    }
  }
  listStarListener = () => {
    const { user, usersRef } = this.state;
    usersRef
      .child(user.uid)
      .child("starred")
      .on("child_added", (snap) => {
        const newVal = {id: snap.key, ...snap.val()}
        this.setState(prevState => ({
          listStarredChannel: [...prevState.listStarredChannel, newVal],
        }));
      });

    usersRef
      .child(`${user.uid}/starred`)
      .on("child_removed", snap => {
        const filteredStarredList = this.state.listStarredChannel.filter(item => item.id !== snap.key);
        this.setState({
          listStarredChannel: filteredStarredList
        })
      })
  };
  setActiveChannel = (channel) => {
    this.setState({
      currentChannelId: channel.id,
    });
  };
  changeChannel = (channel) => {
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
    this.props.setStarredChannel(true);
    this.setActiveChannel(channel);
    this.setState({ currentChannel: channel });
  };
  displayChannel = () => {
    const { listStarredChannel, currentChannelId } = this.state;
    const { isPrivateChannel, isStarredChannel } = this.props;
    return (
      listStarredChannel.length > 0 &&
      listStarredChannel.map((item) => {
        return (
          <div
            onClick={() => this.changeChannel(item)}
            className={
              !isPrivateChannel && isStarredChannel && item.id === currentChannelId
                ? "content-active"
                : "content-item"
            }
            key={item.id}
          >
            <p>#{item.name}</p>
          </div>
        );
      })
    );
  };
  render() {
    const { listStarredChannel } = this.state;
    return (
      <div className="sidepanel-content__channels">
        <div className="divider-title">
          <StarIcon className="divider-title__icon " />
          <p>STARRED CHANNELS({listStarredChannel.length})</p>
        </div>
        {this.displayChannel()}
      </div>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel, setStarredChannel })(
  StarredChannels
);
