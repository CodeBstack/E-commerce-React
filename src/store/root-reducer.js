import { combineReducers } from "redux";    //allows us create larger reducer

import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user:userReducer
})
