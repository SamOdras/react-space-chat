import React from "react";
import SidePanel from "../../components/side-panel/side-panel.component";
import Messages from "../../components/messages/messages.component";
import MetaPanel from "../../components/meta-panel/meta-panel.component";
import "./main-page.styles.scss";

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page-container">
        <SidePanel />
        <Messages />
        <MetaPanel />
      </div>
    );
  }
}

export default MainPage;
