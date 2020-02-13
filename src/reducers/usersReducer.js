import * as types from "../constants/actionTypes";

const usersReducer = (state = {}, action) => {
  switch(action.type) {
    case types.FETCH_USER_1:
      return { ...state, user_1: action.user }
    case types.FETCH_USER_2:
      return { ...state, user_2: action.user }
    default: 
      return state
  }
};

export default usersReducer;