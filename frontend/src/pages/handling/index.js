import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from '@mui/material';

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";

import "./styles.css";
import List from "./list";
import ChemicalHandlingModal from "./modal";

const Handling = (props) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.setPage(page_names.HANDLING);
  }, []);

  return (
    <>
      <div className="handling-page">
        <div className="search-container">
          <TextField id="" label="Search chemical" variant="outlined" />
          <Button>Search</Button>
        </div>
        <List showModal={() => {
          setModal(true)
        }} />
      </div>
      <ChemicalHandlingModal
        open={modal}
        onClose={() => {
          setModal(false)
        }}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handling);