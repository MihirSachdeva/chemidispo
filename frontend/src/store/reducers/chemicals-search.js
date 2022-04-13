import * as actionTypes from "../actions/actionTypes";

const initialState = {
  chemicals: {
    links: {
      next: null,
      previous: null,
    },
    count: 0,
    totalPages: 1,
    results: [],
  },
  error: null,
  isLoading: false,
};

const fetchChemicalsSearchStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchChemicalsSearchSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    chemicals: action.payload.chemicals,
  };
};

const fetchChemicalsSearchFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHEMICALS_SEARCH_START:
      return fetchChemicalsSearchStart(state, action);
    case actionTypes.FETCH_CHEMICALS_SEARCH_SUCCESS:
      return fetchChemicalsSearchSuccess(state, action);
    case actionTypes.FETCH_CHEMICALS_SEARCH_FAIL:
      return fetchChemicalsSearchFail(state, action);
    default:
      return state;
  }
};

export default reducer;
