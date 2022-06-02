const R = require("ramda");

const initialState = {
  mplans: {},
  loading: false,
};

export function mainReducer(state = R.clone(initialState), action) {
  switch (action.type) {
    case "UPDATE_RECIPES":
      state = {
        ...state,
        mplans: action.payload,
      };
      return state;
    case "UPDATE_LOADING":
      state = {
        ...state,
        loading: action.payload,
      };
      return state;

    default:
      return state;
  }
}
