import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { USER_ON_LOGIN } from "../constants/backend-urls";
import Progress from "../components/common/progress";

const OnLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const scope = searchParams.get("scope");

  console.log(code, state, scope);

  const login = () => {
    axios
      .post(USER_ON_LOGIN(), {
        code: code,
        state: state,
      })
      .then((res) => {
        window.location.href = "/";
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (code && state) {
      login();
    }
  }, []);

  return (
    <div>
      <Progress />
    </div>
  );
};

export default OnLogin;
