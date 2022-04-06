import * as actionTypes from "./actionTypes";

export const setPage = (page) => {
  return {
    type: actionTypes.SET_PAGE,
    payload: {
      page,
    },
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch(setPage(page));
  };
};