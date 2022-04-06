import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Divider,
} from "@mui/material";

import "./styles.css";
import Progress from "../../components/common/progress";
import ProjectStats from "../../components/project-stats";
import { PROJECT_STATS } from "../../constants/backend-urls";

const Dashboard = () => {
  const [projectStats, setProjectStats] = useState();
  const [apiCall, setApiCall] = useState({
    isLoading: false,
    error: false,
  });

  const fetchProjectStats = () => {
    setApiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(PROJECT_STATS())
      .then((res) => {
        setProjectStats(res.data);
        setApiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setApiCall({
          isLoading: false,
          error: err,
        });
      });
  };

  useEffect(() => {
    fetchProjectStats();
  }, []);

  console.log(projectStats);

  return !apiCall.isLoading && projectStats ? (
    <div className="dashboard-container">
      <div className="dashboard-container-info-left">
        <div>PROJECT STATS</div>
        <ProjectStats stats={projectStats} />
      </div>
      <Divider />
      <div className="dashboard-container-graph-container">
        <div className="dashboard-container-graph">
          <div>ISSUE STATS</div>
        </div>
      </div>
    </div>
  ) : (
    <Progress />
  );
};

export default Dashboard;
