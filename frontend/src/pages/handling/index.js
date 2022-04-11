import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Typography, Divider } from '@mui/material';

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";

import List from "./list";
import ChemicalHandlingModal from "./modal";
import "./styles.css";
import emptyListIllustration from "../../assets/img/empty.svg";

const chemicals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// const chemicals = [];

const Handling = (props) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    props.setPage(page_names.HANDLING);
  }, []);

  return (
    <>
      <div className="handling-page">
        <Typography variant="h5">Chemical Handling</Typography>

        <Divider variant="middle" style={{ margin: '0.5rem 0' }} />

        <div className="search-container">
          <TextField id="" label="Search chemical" variant="outlined" />
          <Button>Search</Button>
        </div>

        <Divider variant="middle" style={{ margin: '0.5rem 0' }} />

        {chemicals.length ? (
          <List
            chemicals={chemicals}
            showModal={() => {
              setModal(true)
            }}
          />
        ) : (
          <div className="empty-list-illustration-container">
            <img src={emptyListIllustration} className="empty-list-illustration" />
            <br />
            <Typography variant="caption">Search for a chemical to get started!</Typography>
          </div>
        )}

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