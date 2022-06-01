const R = require("ramda");

const initialState = {
  mplans: {},
};

export function mainReducer(state = R.clone(initialState), action) {
  switch (action.type) {
    case "UPDATE_RECIPES":
      state = {
        ...state,
        mplans: action.payload,
      };
      return state;
    default:
      return state;
  }
}
