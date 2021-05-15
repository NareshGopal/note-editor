import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import noteReducer from "./Notes/noteReducer"

const store = createStore(noteReducer, composeWithDevTools(applyMiddleware()));

export default store