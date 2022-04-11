import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Fab, Button, TextField, Chip, Stack, Typography, Divider } from "@mui/material"
import ScienceIcon from '@mui/icons-material/Science';

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";
import CheckboxList from "./list";
import Snackbar from "./snackbar";
import ChemicalDisposalModal from "./modal";

import "./styles.css";
import emptyListIllustration from "../../assets/img/empty.svg";

const allChemicals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// const allChemicals = [];

const Disposal = (props) => {
  const [selectedChemicals, setSelectedChemicals] = useState([]);
  const [modal, setModal] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleChemicalSelect = (chemical) => {
    const currentIndex = selectedChemicals.indexOf(chemical);
    const newChecked = [...selectedChemicals];

    if (currentIndex === -1) {
      if (selectedChemicals.length !== 2) {
        newChecked.push(chemical);
      } else {
        setSnackbar(true);
      }
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedChemicals(newChecked);
  };

  const showDisposalModal = () => {
    if (selectedChemicals.length === 2) {
      setModal(true);
    } else {
      setSnackbar(true);
    }
  }

  useEffect(() => {
    props.setPage(page_names.DISPOSAL);
  }, []);

  return (
    <div className="disposal-page">
      <Typography variant="h5">Chemical Disposal</Typography>

      <Divider variant="middle" style={{ margin: '0.5rem 0' }} />

      <div className="search-container">
        <TextField id="" label="Search chemical" variant="outlined" />
        <Button>Search</Button>
      </div>

      <Divider variant="middle" style={{ margin: '0.5rem 0' }} />

      <Stack direction="row" spacing={1}>
        {selectedChemicals.map((chemical) => (
          <Chip
            key={chemical}
            label={`Chemical ${chemical}`}
            variant="outlined"
            onDelete={() => { handleChemicalSelect(chemical) }}
          />
        ))}
      </Stack>

      <br />

      {allChemicals.length ? (
        <CheckboxList
          allChemicals={allChemicals}
          checked={selectedChemicals}
          handleChemicalSelect={handleChemicalSelect}
        />
      ) : (
        <div className="empty-list-illustration-container">
          <img src={emptyListIllustration} className="empty-list-illustration" />
          <br />
          <Typography variant="caption">Search for a chemical to get started!</Typography>
        </div>
      )}

      <Fab
        onClick={showDisposalModal}
        color="primary"
        variant="extended"
        className="disposal-fab"
        size="large"
        disabled={selectedChemicals.length < 2}
      >
        <ScienceIcon sx={{ mr: 1 }} />
        Compatibility
      </Fab>

      <ChemicalDisposalModal
        open={modal}
        onClose={() => {
          setModal(false)
        }}
      />
      <Snackbar open={snackbar} handleClose={() => { setSnackbar(false) }} />
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