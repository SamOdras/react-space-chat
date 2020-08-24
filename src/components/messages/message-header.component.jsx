import React from "react";
import StarIconOutlined from "@material-ui/icons/StarBorderOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

class MessageHeader extends React.Component {
  state = {
    channel: this.props.currentChannel
  }
  render() {
    const { channel } = this.state;
    return (
      <Paper className="message-header">
        <div className="message-header__title">
          <p>
            #{channel && channel.name}{" "}
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
                <SearchIcon style={{ color: "grey", marginRight: "5px" }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    );
  }
}

export default MessageHeader;