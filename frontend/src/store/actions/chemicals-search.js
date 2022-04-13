import axios from 'axios';
import { CHEMICALS_SEARCH } from '../../constants/backend-urls';
import * as actionTypes from './actionTypes'

export const fetchChemicalsSearchStart = () => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_START,
  };
};

export const fetchChemicalsSearchSuccess = (chemicals) => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_SUCCESS,
    payload: {
      chemicals: chemicals,
    },
  };
};

export const fetchChemicalsSearchFail = (error) => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchChemicalsSearch = (chemical, page) => {
  return (dispatch) => {
    dispatch(fetchChemicalsSearchStart());
    axios
      .get(CHEMICALS_SEARCH(chemical, page))
      .then((res) => {
        const chemicals = res.data;
        dispatch(fetchChemicalsSearchSuccess(chemicals));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchChemicalsSearchFail(err));
      });
  };
};
