export const ADD_STATE = "ADD_STATE"
export const GET_STATE = "GET_STATE";


export const addState = (data) => {
  return {
    type: ADD_STATE,
    data,
  };
};


export const ContentReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STATE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
// export default ContentReducer;