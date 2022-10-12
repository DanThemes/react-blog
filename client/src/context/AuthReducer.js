const { ACTIONS } = require("./Actions");

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        user: payload
      }

    default:
      return state;
  }
}

export default reducer;