import React from "react";
import AddChannelButton from './side-modal';
import CompareArrows from "@material-ui/icons/CompareArrows";
class Channels extends React.Component {
  render() {
    return (
      <div
        className="sidepanel-content__channels"
        style={{ marginBottom: "30px" }}
      >
        <div className="divider-title">
          <CompareArrows className="divider-title__icon" />
          <p>CHANNELS(2)</p>
          <AddChannelButton />
        </div>
        <div className="content-item">#React Channel</div>
        <div className="content-item">#Vue Channel</div>
        <div className="content-item">#Kotlin Channel</div>
        <div className="content-item">#Android Channel</div>
        <div className="content-item">#Php Channel</div>
      </div>
    );
  }
}

export default Channels;
