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

const fetchChemicalsSearchWithCategoryStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
};

const fetchChemicalsSearchWithCategorySuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    chemicals: action.payload.chemicals,
  };
};

const fetchChemicalsSearchWithCategoryFail = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_START:
      return fetchChemicalsSearchWithCategoryStart(state, action);
    case actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_SUCCESS:
      return fetchChemicalsSearchWithCategorySuccess(state, action);
    case actionTypes.FETCH_CHEMICALS_SEARCH_WITH_CATEGORY_FAIL:
      return fetchChemicalsSearchWithCategoryFail(state, action);
    default:
      return state;
  }
};

export default reducer;
