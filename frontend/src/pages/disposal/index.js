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

const allChemicals = [
  { name: "ALUMINUM BROMIDE", cas_number: "7727-15-3", category: "Acids, Strong Non-oxidizing" },
  { name: "FERRIC CHLORIDE", cas_number: "7705-08-0", category: "Acids, Strong Non-oxidizing" },
  { name: "BROMINE", cas_number: "7726-95-6", category: "Acids, Strong Non-oxidizing" },

  { name: "BARIUM OXIDE", cas_number: "1304-28-5", category: "Bases, Strong" },
  { name: "CESIUM HYDROXIDE", cas_number: "21351-79-1", category: "Bases, Strong" },

  { name: "ALPHA-CYCLODEXTRIN", cas_number: "10016-20-3", category: "Alcohols and Polyols" },
  { name: "ALLYL ALCOHOL", cas_number: "107-18-6", category: "Alcohols and Polyols" },

  { name: "AMMONIUM SULFIDE, SOLUTION", cas_number: "12135-76-1", category: "Water and Aqueous Solutions" },
  { name: "AMMONIUM THIOCYANATE LIQUOR", cas_number: "1762-95-4", category: "Water and Aqueous Solutions" },
  { name: "1,4-BUTYNEDIOL", cas_number: "110-65-6", category: "Water and Aqueous Solutions" },
  { name: "DEXTROSE SOLUTION", cas_number: "50-99-7", category: "Water and Aqueous Solutions" },
];

const Disposal = (props) => {
  const [selectedChemicals, setSelectedChemicals] = useState([]);
  const [modal, setModal] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleChemicalSelect = (newChemical) => {
    const currentIndex = selectedChemicals.findIndex(chemical => {
      return chemical.cas_number === newChemical.cas_number
    });
    const newChecked = [...selectedChemicals];

    if (currentIndex === -1) {
      if (selectedChemicals.length !== 2) {
        newChecked.push(newChemical);
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
            key={chemical.cas_number}
            label={chemical.name}
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