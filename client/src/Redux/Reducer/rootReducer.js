import { combineReducers } from "redux";
import { userReducer } from "./userSlice";

const rootReducer = combineReducers({
    userAccont: userReducer
    // dpm: dpmReducer,
    // project: projectReducer,
    // task: taskReducer,
    // role: roleReducer,
    // auth: authReducer,
    // error: errorReducer,
    // loading: loadingReducer,
});

export default rootReducer;