import React from "react";

const  ProjectStats = (props) => {
  return (
    <div className="project-container-issue-stats-container">
      {props.stats.map((stat, index) => (
        <div key={index} className="project-container-issue-stats">
          <div>{stat.text}</div>
          <h1>{stat.numProjects}</h1>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
