import React from "react";
import { CircularProgress } from "@mui/material";

const Progress = (props) => {
  return (
    <div className="progress-spinner">
      <CircularProgress />
    </div>
  );
};

export default Progress;