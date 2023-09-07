// import { ADD_STATE } from "./actions";

import {  GET_STATE } from "./actions";

const initialState = {
 
};

const ContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATE:
      return {
        ...state
      };
    default:
      return state;
  }
};
export default ContentReducer;
