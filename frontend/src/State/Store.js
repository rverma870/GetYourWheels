import { createStore, applyMiddleware } from "redux";
import reducers from "./Reducers/IndexReducers";
import thunk from "redux-thunk";

//create store takes two parameters reducers and default state ie. empty
//object in this case.
export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk),
    window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_(),
);
