import React from "react";
import SidePanel from "../../components/side-panel/side-panel.component";
import Messages from "../../components/messages/messages.component";
import MetaPanel from "../../components/meta-panel/meta-panel.component";
import "./main-page.styles.scss";

import { connect } from "react-redux";

class MainPage extends React.Component {
  render() {
    const { current_user, current_channel, is_private_channel } = this.props;
    return (
      <div className="main-page-container">
        <SidePanel
          currentUser={current_user}
          currentChannel={current_channel}
          isPrivateChannel={is_private_channel}
        />
        <Messages
          currentUser={current_user}
          key={current_channel && current_channel.id}
          currentChannel={current_channel}
          isPrivateChannel={is_private_channel}
        />
        <MetaPanel
          currentUser={current_user}
          currentChannel={current_channel}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  current_user: state.user.currentUser,
  current_channel: state.channel.currentChannel,
  is_private_channel: state.channel.isPrivateChannel,
});
export default connect(mapStateToProps)(MainPage);
