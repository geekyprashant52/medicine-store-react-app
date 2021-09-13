import { manageloginUser } from "../Reducers/manageLoginUserReducer";
import { createStore } from "redux";

const store = createStore(manageloginUser);

export default store;
