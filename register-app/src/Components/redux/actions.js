export const ADD_STATE = "ADD_STATE"
export const GET_STATE = "GET_STATE";


export const addState = (data) => {
  return {
    type: ADD_STATE,
    data,
  };
};

export const getState = (data) => {
  return {
    type: GET_STATE,
    data,
  };
};