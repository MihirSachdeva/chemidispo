import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Fab, Button, TextField } from "@mui/material"
import NavigationIcon from '@mui/icons-material/Navigation';

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";
import CheckboxList from "./list";
import ScienceIcon from '@mui/icons-material/Science';

import "./styles.css";

const Disposal = (props) => {
  useEffect(() => {
    props.setPage(page_names.DISPOSAL);
  }, []);

  return (
    <div className="disposal-page">
      <div className="search-container">
        <TextField id="" label="Search chemical" variant="outlined" />
        <Button>Search</Button>
      </div>
      <CheckboxList />
      <Fab color="primary" variant="extended" className="disposal-fab" size="large">
        <ScienceIcon sx={{ mr: 1 }} />
        Show Compatibility
      </Fab>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page.page,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => dispatch(setPage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Disposal);