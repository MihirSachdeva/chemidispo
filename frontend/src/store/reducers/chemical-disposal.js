import * as actionTypes from "../actions/actionTypes";

const initialState = {
  report: [],
  error: null,
  isLoading: false,
};

const fetchChemicalDisposalStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchChemicalDisposalSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    report: action.payload.report,
  };
};

const fetchChemicalDisposalFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHEMICAL_DISPOSAL_START:
      return fetchChemicalDisposalStart(state, action);
    case actionTypes.FETCH_CHEMICAL_DISPOSAL_SUCCESS:
      return fetchChemicalDisposalSuccess(state, action);
    case actionTypes.FETCH_CHEMICAL_DISPOSAL_FAIL:
      return fetchChemicalDisposalFail(state, action);
    default:
      return state;
  }
};

export default reducer;
