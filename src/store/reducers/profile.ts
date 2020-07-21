import { SET_PROFILE_PIC } from "../actions/types";

export const initialState = {
  avatar: undefined,
  coverPhoto: undefined,
};

/**
 * @param {{ type: string; payload: { key: string; dataUrl: string; }; }} action
 */
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_PROFILE_PIC:
      return {
        ...state,
        [action.payload.key]: action.payload.dataUrl || "",
      };

    default:
      return state;
  }
}
