import React from "react";
import Paper from "@material-ui/core/Paper";

import StarIconOutlined from "@material-ui/icons/StarBorderOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import "./messages.styles.scss";

class Messages extends React.Component {
  render() {
    return (
      <div className="messages-container">
        <Paper className="message-header">
          <div className="message-header__title">
            <p>
              #React Channel{" "}
              <StarIconOutlined style={{ fontSize: 35, alignSelf: "start" }} />
            </p>
            <span>1 User</span>
          </div>
          <TextField
            className="message-header__search"
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
        <Paper className="message-panel">
          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Hello there !</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">H</Avatar>
            <div className="message-item__content-other">
              <Link >Hafiyan</Link>
              <small>few seconds ago</small>
              <p>How do you do !</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Im perfectly fine</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">H</Avatar>
            <div className="message-item__content-other">
              <Link >Hafiyan</Link>
              <small>few seconds ago</small>
              <p>Oh ! great then</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Yeah as always</p>
            </div>
          </div>

          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Hello there !</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">H</Avatar>
            <div className="message-item__content-other">
              <Link >Hafiyan</Link>
              <small>few seconds ago</small>
              <p>How do you do !</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Im perfectly fine</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">H</Avatar>
            <div className="message-item__content-other">
              <Link >Hafiyan</Link>
              <small>few seconds ago</small>
              <p>Oh ! great then</p>
            </div>
          </div>
          <div className="message-item">
            <Avatar variant="rounded">B</Avatar>
            <div className="message-item__content-self">
              <Link >Bagus Ridho</Link>
              <small>few seconds ago</small>
              <p>Yeah as always</p>
            </div>
          </div>
        </Paper>
        <Paper className="message-input">Message input</Paper>
      </div>
    );
  }
}

export default Messages;
