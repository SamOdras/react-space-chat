import React from "react";
import NotFound from "../../assets/not-found.png";
import { Typography } from "@material-ui/core";
import "./error-notfound.styles.scss";

const PageNotFoundDisplay = () => {
  return (
    <div className="not-found-overlay">
      <div className="not-found-wrapper">
        <img
          src={NotFound}
          alt="Glasses"
          className="not-found-wrapper__banner"
        />
        <Typography variant="body1" className="not-found-wrapper__title">
          Page Not Found | 404.1
        </Typography>
      </div>
    </div>
  );
};

export default PageNotFoundDisplay;
