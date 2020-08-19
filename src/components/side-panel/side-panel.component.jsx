import React from "react";
import SidePanelLogo from "../../assets/logo.png";
import "./side-panel.styles.scss";
import AddChannelButton from './side-modal';

import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import ExpandMore from "@material-ui/icons/ExpandMore";
import CompareArrows from "@material-ui/icons/CompareArrows";
import MessageIcon from "@material-ui/icons/Message";


class SidePanel extends React.Component {
  state = {
    anchorEl: null,
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
  render() {
    const { anchorEl } = this.state;
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
            Signed as Bagus Ridho
          </MenuItem>
          <MenuItem selected onClick={this.handleClose}>Change Avatar</MenuItem>
          <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
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
                <Avatar className="avatar-image">B</Avatar>
                <p>Bagus Ridho</p>
                <ExpandMore />
              </div>
            </Tooltip>
          </div>
          <div className="sidepanel-content">
            <div
              className="sidepanel-content__channels"
              style={{ marginBottom: "30px" }}
            >
              <div className="divider-title">
                <CompareArrows className="divider-title__icon" />
                <p>CHANNELS(2)</p>
                <AddChannelButton/>
              </div>
              <div className="content-item">#React Channel</div>
              <div className="content-item">#Vue Channel</div>
              <div className="content-item">#Kotlin Channel</div>
              <div className="content-item">#Android Channel</div>
              <div className="content-item">#Php Channel</div>
            </div>

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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SidePanel;
