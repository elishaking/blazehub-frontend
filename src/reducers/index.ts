import { combineReducers } from "redux";
import authReducer from "./auth";
import friendReducer from "./friend";
import chatReducer from "./chat";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  friends: friendReducer,
  chats: chatReducer,
  profile: profileReducer,
});
