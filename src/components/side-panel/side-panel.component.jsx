import React from "react";
import SidePanelLogo from "../../assets/logo.png";
import "./side-panel.styles.scss";
import firebase from "../../firebase";

import MessagesComponent from "./side-direct-messages";
import ChannelsComponent from "./side-channels";

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import ExpandMore from "@material-ui/icons/ExpandMore";

import { connect } from "react-redux";

class SidePanel extends React.Component {
  state = {
    anchorEl: null,
    user: this.props.current_user,
  };
  handleOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out"));
  };
  render() {
    const { anchorEl, user } = this.state;
    console.log(user);
    return (
      <React.Fragment>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem disabled onClick={this.handleClose}>
           Signed as {user.displayName}
          </MenuItem>
          <MenuItem selected onClick={this.handleClose}>
            Change Avatar
          </MenuItem>
          <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
        </Menu>
        <div className="sidepanel-container">
          <div className="sidepanel-header" onClick={this.handleOpen}>
            <div className="sidepanel-header__logo">
              <img
                src={SidePanelLogo}
                alt="Side panel logo"
                style={{ width: "100%" }}
              />
            </div>
            <Tooltip title="Click to see options" arrow placement="right">
              <div className="sidepanel-header__avatar">
                <Avatar
                  className="avatar-image"
                  alt={user.displayName}
                  src={user.photoURL}
                />
                <p>{user.displayName}</p>
                <ExpandMore />
              </div>
            </Tooltip>
          </div>
          <div className="sidepanel-content">
            <ChannelsComponent currentUser={user}/>
            <MessagesComponent currentUser={user}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  current_user: state.user.currentUser,
});
export default connect(mapStateToProps)(SidePanel);
