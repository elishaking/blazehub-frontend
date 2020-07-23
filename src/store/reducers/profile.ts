import { SET_PROFILE_PIC, REMOVE_PROFILE_PICS } from "../actions/types";

export const initialState = {
  authAvatar: undefined,
  avatar: undefined,
  coverPhoto: undefined,
  isForOtherUser: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_PROFILE_PIC:
      const { key, isOtherUser, dataUrl } = action.payload;
      if (key === "avatar" && !isOtherUser)
        return {
          ...state,
          avatar: dataUrl || "",
          authAvatar: dataUrl || "",
        };

      return {
        ...state,
        [key]: dataUrl || "",
        isForOtherUser: isOtherUser,
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
