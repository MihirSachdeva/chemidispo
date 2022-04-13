import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Fab,
  Button,
  TextField,
  Chip,
  Stack,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";
import CheckboxList from "./list";
import Snackbar from "./snackbar";
import ChemicalDisposalModal from "./modal";
import { fetchChemicalsSearchWithCategory } from "../../store/actions/chemicals-search-with-category";
import { fetchChemicalDisposal } from "../../store/actions/chemical-disposal";

import "./styles.css";
import emptyListIllustration from "../../assets/img/empty.svg";

const Disposal = (props) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedChemicals, setSelectedChemicals] = useState([]);
  const [modal, setModal] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleChemicalSelect = (newChemical) => {
    const currentIndex = selectedChemicals.findIndex((chemical) => {
      return chemical.name === newChemical.name;
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

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    searchChemicals(value);
  };

  const searchChemicals = (pageNumber = page) => {
    props.fetchChemicalsSearch(search, pageNumber);
  };

  const showDisposalModal = () => {
    if (selectedChemicals.length === 2) {
      props.fetchChemicalDisposal(
        selectedChemicals[0].id,
        selectedChemicals[1].id
      );
      setModal(true);
    } else {
      setSnackbar(true);
    }
  };

  useEffect(() => {
    props.setPage(page_names.DISPOSAL);
  }, []);

  return (
    <div className="disposal-page">
      <Typography variant="h5">Chemical Disposal</Typography>

      <Divider variant="middle" style={{ margin: "0.5rem 0" }} />

      <div className="search-container">
        <TextField
          value={search}
          label="Search chemical"
          variant="outlined"
          onChange={handleChange}
        />
        <Button
          onClick={() => {
            searchChemicals();
          }}
        >
          Search
        </Button>
      </div>

      <Divider variant="middle" style={{ margin: "0.5rem 0" }} />

      <Stack direction="row" spacing={1} className="selected-chemicals-chip">
        {selectedChemicals.map((chemical) => (
          <Chip
            key={chemical.casNumber[0]}
            label={chemical.name}
            variant="outlined"
            onDelete={() => {
              handleChemicalSelect(chemical);
            }}
          />
        ))}
      </Stack>

      <br />

      {props.chemicalsSearchIsLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : props.chemicalsSearchError ? (
        <div>
          <Alert severity="error">
            Could not fetch chemicals. Please try again later.
          </Alert>
        </div>
      ) : props.chemicalsSearch.results.length ? (
        <CheckboxList
          allChemicals={props.chemicalsSearch.results}
          checked={selectedChemicals}
          handleChemicalSelect={handleChemicalSelect}
        />
      ) : (
        <div className="empty-list-illustration-container">
          <img
            src={emptyListIllustration}
            className="empty-list-illustration"
          />
          <br />
          <Typography variant="caption">
            Search for a chemical to get started!
          </Typography>
        </div>
      )}

      <Pagination
        count={props.chemicalsSearch.totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />

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
          setModal(false);
        }}
      />
      <Snackbar
        open={snackbar}
        handleClose={() => {
          setSnackbar(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page.page,

    chemicalsSearch: state.chemicalsSearchWithCategory.chemicals,
    chemicalsSearchError: state.chemicalsSearchWithCategory.error,
    chemicalsSearchIsLoading: state.chemicalsSearchWithCategory.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => dispatch(setPage(page)),
    fetchChemicalsSearch: (chemical, page) => {
      return dispatch(fetchChemicalsSearchWithCategory(chemical, page));
    },
    fetchChemicalDisposal: (chemical1, chemical2) => {
      return dispatch(fetchChemicalDisposal(chemical1, chemical2));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Disposal);
