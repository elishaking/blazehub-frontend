import app from "firebase/app";
import "firebase/database";

import { SET_PROFILE_PIC } from "./types";
import { logError } from "../../utils";

/**
 * @param {string} key
 * @param {string} dataUrl
 */
const setProfilePic = (key: string, dataUrl: string) => ({
  type: SET_PROFILE_PIC,
  payload: { key, dataUrl },
});

/**
 * @param {string} userId
 * @param {string} key
 */
export const getProfilePic = (
  userId: string,
  key: "avatar" | "coverPhoto"
) => async (dispatch: any) => {
  await app
    .database()
    .ref("profile-photos")
    .child(userId)
    .child(key)
    .once("value")
    .then((picSnapShot) => {
      dispatch(setProfilePic(key, picSnapShot.val()));
    })
    .catch((err) => logError(err));
};

/**
 * @param {string} userId
 * @param {string} key
 * @param {string} dataUrl
 */
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
          .then(() => dispatch(setProfilePic(key, dataUrl)))
          .catch((err) => {
            // console.log(err)
            logError(err);
          });
      } else {
        dispatch(setProfilePic(key, dataUrl));
      }
    })
    .catch((err) => {
      // console.log(err)
      logError(err);
    });
};
