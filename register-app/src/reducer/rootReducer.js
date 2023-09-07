import { combineReducers } from "redux";
import pageReducer from "../Components/redux/Pagereducer";
// import pageReducer2 from "../Components/redux/Contentreducer";
import ContentReducer from "../Components/redux/Contentreducer";

const rootReducer = combineReducers({
  page: pageReducer,
  content: ContentReducer,
});

export default rootReducer;
