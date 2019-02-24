import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import campaign from "./reducer/campaign_reducer.js";
import character from "./reducer/character_reducer.js";
import message from "./reducer/message_reducer.js";

const reducer = combineReducers({
  campaign,
  character,
  message
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromiseMiddleware()))
);
