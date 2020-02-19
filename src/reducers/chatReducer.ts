//@ts-check
import { ADD_CHAT } from "../actions/types";

export default function(state: any = {}, action: any) {
  switch (action.type) {
    case ADD_CHAT:
      let chats = state;
      const { chatKey, message } = action.payload;
      if (chats[chatKey]) {
        chats[chatKey][message.key] = message;
      } else {
        chats[chatKey] = { [message.key]: message };
      }
      return { ...chats };

    default:
      return state;
  }
}
