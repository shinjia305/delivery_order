import { REQUEST_STATE } from "../constants";

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  postState: REQUEST_STATE.INITIAL,
  preOrdersSummary: null,
};

export const preOrdersActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const preOrdersReducer = (state, action) => {
  switch (action.type) {
    case preOrdersActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case preOrdersActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        preOrdersSummary: action.payload.preOrdersSummary,
      };
    case preOrdersActionTyps.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case preOrdersActionTyps.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}
