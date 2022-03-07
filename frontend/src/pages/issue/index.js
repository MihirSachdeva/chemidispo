import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { links } from "../../constants/frontend-urls";
import axios from "axios";
import {
  Button,
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";

import IssueStatus from "../../components/common/issue-status";
import IssueTag from "../../components/common/issue-tag";
import UserAvatar from "../../components/common/user-avatar";
import IssuePriority from "../../components/common/issue-priority";
import "./styles.css";
import { issueData } from "../../mocks/";
import { ISSUE, COMMENT, COMMENTS } from "../../constants/backend-urls";

const Issue = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState();
  const [comments, setComments] = useState();
  const [apiCall, setAPiCall] = useState({
    isLoading: false,
    error: false,
  });

  const fetchIssue = (issueId) => {
    setAPiCall({
      isLoading: true,
      error: false,
    });
    axios
      .get(ISSUE(issueId))
      .then((res) => {
        setIssue(res.data);
        setAPiCall({
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setAPiCall({
          isLoading: false,
          error: err,
        });
      });
  };

  const fetchComments = (issueId) => {
    axios
      .get(COMMENTS())
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchIssue(issueId);
  }, [issueId]);

  useEffect(() => {
    fetchComments(issueId);
  }, []);

  console.log(issue);

  return !apiCall.isLoading && issue && comments ? (
    <div className="issue-container">
      <h3>{issue.title}</h3>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>REPORTED BY</div>
          <div>
            <Link to={links.USER(issue.reporter.id)}>
              <UserAvatar user={issue.reporter} />
            </Link>
          </div>
        </div>
        <div className="issue-container-info-right">
          <div>CREATED ON</div>
          <div>30/01/2022</div>
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>TAGS</div>
        <div className="issue-container-assignee">
          {issue.tags.map((tag, index) => {
            return <IssueTag tag={tag} index={index} />;
          })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-reporter">
        <div className="issue-container-info-left">
          <div>STATUS</div>
          <IssueStatus status={issue.status} />
        </div>
        <div className="issue-container-info-right">
          <div>PRIORITY</div>
          <IssuePriority priority={issue.priority} />
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>ASSIGNEES</div>
        <div className="issue-container-assignee">
          {issue.assignee.map((user, index) => {
            return (
              <Link to={links.USER(user.id)}>
                <UserAvatar user={user} />
              </Link>
            );
          })}
        </div>
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>DESCRIPTION</div>
        <div dangerouslySetInnerHTML={{ __html: issue.description }} />
      </div>
      <Divider />
      <div className="issue-container-info-left">
        <div>COMMENTS</div>
        {comments.map((comment, index) => {
          return (
            <div className="issue-container-comment-box">
              <Avatar src={comment.commenterDetails.avatar} />
              <div className="issue-container-comment-content">
                <div className="">
                  <Link to={links.USER(comment.commenter)}>{comment.commenterDetails.name}</Link>
                  <span>• {comment.timestamp}</span>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.text }}
                  className=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Issue;
