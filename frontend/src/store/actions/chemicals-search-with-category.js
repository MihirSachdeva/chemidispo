import axios from "axios";
import { CHEMICALS_SEARCH_WITH_CATEGORY } from "../../constants/backend-urls";
import * as actionTypes from "./actionTypes";

export const fetchChemicalsSearchWithCategoryStart = () => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_START,
  };
};

export const fetchChemicalsSearchWithCategorySuccess = (chemicals) => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_SUCCESS,
    payload: {
      chemicals: chemicals,
    },
  };
};

export const fetchChemicalsSearchWithCategoryFail = (error) => {
  return {
    type: actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_FAIL,
    payload: {
      error: error,
    },
  };
};

export const fetchChemicalsSearchWithCategory = (chemical, page) => {
  return (dispatch) => {
    dispatch(fetchChemicalsSearchWithCategoryStart());
    axios
      .get(CHEMICALS_SEARCH_WITH_CATEGORY(chemical, page))
      .then((res) => {
        const chemicals = res.data;
        dispatch(fetchChemicalsSearchWithCategorySuccess(chemicals));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchChemicalsSearchWithCategoryFail(err));
      });
  };
};
