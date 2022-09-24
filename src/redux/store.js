import LoginReducer from "./login/LoginReducer";
import Reducers from "./Reducer";
import { createStore,applyMiddleware } from "redux";
export default function configureStore(){
    createStore(Reducers,false);
}
