import axios from "axios";
import { CHEMICAL_HANDLING } from "../../constants/backend-urls";
import * as actionTypes from "./actionTypes";

export const fetchChemicalHandlingStart = () => {
  return {
    type: actionTypes.FETCH_CHEMICAL_HANDLING_START,
  };
};

export const fetchChemicalHandlingSuccess = (chemical) => {
  return {
    type: actionTypes.FETCH_CHEMICAL_HANDLING_SUCCESS,
    payload: {
      chemical: chemical,
    },
  };
};

export const fetchChemicalHandlingFail = (error) => {
  return {
    type: actionTypes.FETCH_CHEMICAL_HANDLING_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchChemicalHandling = (chemical) => {
  return (dispatch) => {
    dispatch(fetchChemicalHandlingStart());
    axios
      .get(CHEMICAL_HANDLING(chemical))
      .then((res) => {
        const chemical = res.data;
        dispatch(fetchChemicalHandlingSuccess(chemical));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchChemicalHandlingFail(err));
      });
  };
};
