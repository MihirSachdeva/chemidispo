import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";

import { page_names } from "../../constants/frontend-urls";
import { setPage } from "../../store/actions/page";
import { fetchChemicalsSearch } from "../../store/actions/chemicals-search";
import List from "./list";
import ChemicalHandlingModal from "./modal";

import "./styles.css";
import emptyListIllustration from "../../assets/img/empty.svg";
import { fetchChemicalHandling } from "../../store/actions/chemical-handling";

const Handling = (props) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    searchChemicals(value);
  };

  const handleShowHandling = (chemical) => {
    props.fetchChemicalHandling(chemical);
    setModal(true);
  };

  const searchChemicals = (pageNumber = page) => {
    props.fetchChemicalsSearch(search, pageNumber);
  };

  useEffect(() => {
    props.setPage(page_names.HANDLING);
  }, []);

  console.log(
    props.chemicalsSearch,
    props.chemicalsSearchIsLoading,
    props.chemicalsSearchError
  );

  return (
    <>
      <div className="handling-page">
        <Typography variant="h5">Chemical Handling</Typography>

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
          <List
            chemicals={props.chemicalsSearch.results}
            showModal={(chemical) => {
              handleShowHandling(chemical);
            }}
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

        <div>
          <Pagination
            count={props.chemicalsSearch.totalPages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
      <ChemicalHandlingModal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    page: state.page.page,

    chemicalsSearch: state.chemicalsSearch.chemicals,
    chemicalsSearchError: state.chemicalsSearch.error,
    chemicalsSearchIsLoading: state.chemicalsSearch.isLoading,

    chemicalHandling: state.chemicalHandling.chemical,
    chemicalHandlingError: state.chemicalHandling.error,
    chemicalHandlingIsLoading: state.chemicalHandling.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => dispatch(setPage(page)),
    fetchChemicalsSearch: (chemical, page) => {
      return dispatch(fetchChemicalsSearch(chemical, page));
    },
    fetchChemicalHandling: (chemical) => {
      return dispatch(fetchChemicalHandling(chemical));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handling);
