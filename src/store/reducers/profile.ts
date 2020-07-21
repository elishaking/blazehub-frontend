import { SET_PROFILE_PIC, REMOVE_PROFILE_PICS } from "../actions/types";

export const initialState = {
  avatar: undefined,
  coverPhoto: undefined,
  isForOtherUser: false,
};

export default function (state = initialState, action: any) {
  console.log(action.type);
  switch (action.type) {
    case SET_PROFILE_PIC:
      return {
        ...state,
        [action.payload.key]: action.payload.dataUrl || "",
        isForOtherUser: action.payload.isOtherUser,
      };

    case REMOVE_PROFILE_PICS:
      return {
        ...state,
        avatar: undefined,
        coverPhoto: undefined,
      };

    default:
      return state;
  }
}
