import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        position="static"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            ChadLabs
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
