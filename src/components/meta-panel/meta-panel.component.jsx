import React from "react";
import "./meta-panel.styles.scss";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Link from '@material-ui/core/Link'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PencilIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import UserIcon from "@material-ui/icons/People";

class MetaPanel extends React.Component {
  state = {
    activeIndex: null,
  };
  handleChange = (panel) => (e, isExpanded) => {
    console.log(isExpanded);
    this.setState({
      activeIndex: isExpanded ? panel : false,
    });
  };
  displayMessages = (topUserPosts) => {
    return Object.entries(topUserPosts)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([key, val], i) => (
        <div className="avatar-item" key={i}>
          <Avatar variant="rounded" src={val.avatar} />
          <div className="avatar-item__content">
            <Link>{key}</Link>
            <p>{val.count} posts</p>
          </div>
        </div>
      ))
      .slice(0, 4);
  };
  render() {
    const { activeIndex } = this.state;
    const { currentChannel, userTotalPosts, isPrivateChannel } = this.props;
    if(isPrivateChannel) return <div className="metapanel-container"></div>;
    return (
      <div className="metapanel-container">
        <Paper className="metapanel-header">
          About #{currentChannel && currentChannel.name}
        </Paper>
        <Accordion
          expanded={activeIndex === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <InfoIcon />
            <Typography className="metapanel-title">Channel Details</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Typography>{currentChannel && currentChannel.details}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={activeIndex === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <UserIcon />
            <Typography className="metapanel-title">
              Top Active Users
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails style={{flexDirection:'column'}}>
            {userTotalPosts && this.displayMessages(userTotalPosts)}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={activeIndex === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <PencilIcon />
            <Typography className="metapanel-title">Created By</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails className="metapanel-createdby">
            <Avatar src={currentChannel && currentChannel.createdBy.avatar} />
            <Typography>
              {currentChannel && currentChannel.createdBy.name}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default MetaPanel;
