import { combineReducers } from "redux";
import authReducer from "./auth";
import friendReducer from "./friendReducer";
import chatReducer from "./chat";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  friends: friendReducer,
  chats: chatReducer,
  profile: profileReducer,
});
