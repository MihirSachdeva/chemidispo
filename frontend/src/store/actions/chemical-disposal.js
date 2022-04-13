import axios from "axios";
import { CHEMICAL_DISPOSAL } from "../../constants/backend-urls";
import * as actionTypes from "./actionTypes";

export const fetchChemicalDisposalStart = () => {
  return {
    type: actionTypes.FETCH_CHEMICAL_DISPOSAL_START,
  };
};

export const fetchChemicalDisposalSuccess = (report) => {
  return {
    type: actionTypes.FETCH_CHEMICAL_DISPOSAL_SUCCESS,
    payload: {
      report: report,
    },
  };
};

export const fetchChemicalDisposalFail = (error) => {
  return {
    type: actionTypes.FETCH_CHEMICAL_DISPOSAL_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchChemicalDisposal = (chemical1, chemical2) => {
  return (dispatch) => {
    dispatch(fetchChemicalDisposalStart());
    axios
      .get(CHEMICAL_DISPOSAL(chemical1, chemical2))
      .then((res) => {
        const report = res.data;
        dispatch(fetchChemicalDisposalSuccess(report));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchChemicalDisposalFail(err));
      });
  };
};
