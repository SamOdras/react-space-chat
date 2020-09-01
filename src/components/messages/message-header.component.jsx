import React from "react";
import StarIconOutlined from "@material-ui/icons/StarBorderOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

class MessageHeader extends React.Component {
  state = {
    channel: this.props.currentChannel,
    isPrivateChannel: this.props.isPrivateChannel,
  };
  render() {
    const { channel, isPrivateChannel } = this.state;
    const { isLoading, handleChange } = this.props;
    return (
      <Paper className="message-header">
        <div className="message-header__title">
          <p>
            {isPrivateChannel ? "@" : "#"}
            {channel && channel.name}{" "}
            {!isPrivateChannel && (
              <StarIconOutlined style={{ fontSize: 35, alignSelf: "start" }} />
            )}
          </p>
          {!isPrivateChannel && (
            <span>Total Users: {this.props.totalUsers}</span>
          )}
          {isPrivateChannel && <span>Status: {channel.status}</span>}
        </div>
        <TextField
          className="message-header__search"
          variant="outlined"
          placeholder="Search"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment>
                {isLoading ? (
                  <CircularProgress size={20} style={{ color: "grey", marginRight: "9px" }} />
                ) : (
                  <SearchIcon style={{ color: "grey", marginRight: "5px" }} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    );
  }
}

export default MessageHeader;
