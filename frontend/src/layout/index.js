import * as React from "react";
import { Grid } from "@mui/material";
import Routes from '../routes/protected-routes'
import BottomNav from "../components/bottom-nav";

import "./styles.css";

const Layout = () => {
  return (
    <Grid sx={{ display: "flex" }} className="content-grid">
      <Routes />
      <BottomNav />
    </Grid>
  );
};

export default Layout;
