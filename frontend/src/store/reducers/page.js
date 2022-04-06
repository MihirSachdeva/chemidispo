import * as actionTypes from "../actions/actionTypes";

const initialState = {
  page: '',
};

const setPage = (state, action) => {
  return {
    ...state,
    page: action.payload.page,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return setPage(state, action);
    default:
      return state;
  }
};

export default reducer;