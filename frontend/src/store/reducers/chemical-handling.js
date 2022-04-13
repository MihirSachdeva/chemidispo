import * as actionTypes from "../actions/actionTypes";

const initialState = {
  chemical: null,
  error: null,
  isLoading: false,
};

const fetchChemicalHandlingStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchChemicalHandlingSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    chemical: action.payload.chemical,
  };
};

const fetchChemicalHandlingFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHEMICAL_HANDLING_START:
      return fetchChemicalHandlingStart(state, action);
    case actionTypes.FETCH_CHEMICAL_HANDLING_SUCCESS:
      return fetchChemicalHandlingSuccess(state, action);
    case actionTypes.FETCH_CHEMICAL_HANDLING_FAIL:
      return fetchChemicalHandlingFail(state, action);
    default:
      return state;
  }
};

export default reducer;
