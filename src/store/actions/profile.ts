import app from "firebase/app";
import "firebase/database";

import { SET_PROFILE_PIC, REMOVE_PROFILE_PICS } from "./types";
import { logError } from "../../utils";

const setProfilePic = (key: string, dataUrl: string, isOtherUser: boolean) => ({
  type: SET_PROFILE_PIC,
  payload: { key, dataUrl, isOtherUser },
});

const removeProfilePics = () => ({
  type: REMOVE_PROFILE_PICS,
});

export const getProfilePic = (
  userId: string,
  key: "avatar" | "coverPhoto",
  isOtherUser = false
) => async (dispatch: any) => {
  await app
    .database()
    .ref("profile-photos")
    .child(userId)
    .child(key)
    .once("value")
    .then((picSnapShot) => {
      dispatch(setProfilePic(key, picSnapShot.val(), isOtherUser));
    })
    .catch((err) => logError(err));
};

export const deleteProfilePics = () => (dispatch: any) => {
  dispatch(removeProfilePics());
};

export const updateProfilePic = (
  userId: string,
  key: string,
  dataUrl: string,
  dataUrlSmall = ""
) => async (dispatch: any) => {
  const profileRef = app.database().ref("profile-photos").child(userId);

  await profileRef
    .child(key)
    .set(dataUrl)
    .then(async () => {
      if (dataUrlSmall) {
        await profileRef
          .child("avatar-small")
          .set(dataUrlSmall)
          .then(() => dispatch(setProfilePic(key, dataUrl, false)))
          .catch((err) => {
            logError(err);
          });
      } else {
        dispatch(setProfilePic(key, dataUrl, false));
      }
    })
    .catch((err) => {
      logError(err);
    });
};
