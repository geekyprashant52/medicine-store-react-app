const CHANGE_USER = "CHANGE_USER";

const initialState = {
  user: "",
};

export const manageloginUser = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
