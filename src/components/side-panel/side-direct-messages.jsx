import React from "react";
import MessageIcon from "@material-ui/icons/Message";
class DirectMessages extends React.Component {
  render() {
    return (
      <div className="sidepanel-content__users">
        <div className="divider-title">
          <MessageIcon className="divider-title__icon " />
          <p>DIRRECT MESSAGES(2)</p>
        </div>
        <div className="content-item">@Charlie</div>
        <div className="content-item">@Samodra</div>
        <div className="content-item">@Hafiyan</div>
        <div className="content-item">@Chirstine</div>
        <div className="content-item">@Masduki</div>
      </div>
    );
  }
}

export default DirectMessages;
