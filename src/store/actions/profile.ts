import app from "firebase/app";
import "firebase/database";

import { SET_PROFILE_PIC, REMOVE_PROFILE_PICS } from "./types";
import { logError } from "../../utils";
import { ProfileData } from "../../models/profile";

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

export const fetchProfileDetails = async (username: string) => {
  const profileSnapShot = await app
    .database()
    .ref("profiles")
    .orderByChild("username")
    .equalTo(username)
    .once("value");

  return profileSnapShot;
};

export const fetchProfileDetailsById = async (userId: string) => {
  const profileSnapShot = await app
    .database()
    .ref("profiles")
    .child(userId)
    .once("value");

  return profileSnapShot;
};

export const isValidUsername = async (username: string) => {
  try {
    const profileSnapshot = await app
      .database()
      .ref("profiles")
      .orderByChild("username")
      .equalTo(username)
      .once("value");
    if (profileSnapshot.exists()) return false;
  } catch (err) {
    throw err;
  }

  return true;
};

export const updateProfileData = async (
  { name, bio, location, website, birth }: ProfileData,
  profileId: string
) => {
  try {
    await app
      .database()
      .ref("profiles")
      .child(profileId)
      .update({
        name,
        bio,
        location: location || "",
        website: website || "",
        birth: birth || "",
      });
  } catch (err) {
    throw err;
  }
};

export const uploadPhotos = async (photos: string[], userId: string) => {
  await Promise.all(
    photos.map((photo) =>
      app
        .database()
        .ref("profile-photos")
        .child(userId)
        .child("photos")
        .push(photo)
    )
  );
};

export const fetchPhotos = async (userId: string) => {
  const photosSnapshot = await app
    .database()
    .ref("profile-photos")
    .child(userId)
    .child("photos")
    .once("value");
  if (photosSnapshot.exists()) {
    const photosMap = photosSnapshot.val();
    return Object.keys(photosMap).map((key) => photosMap[key]);
  }

  return [];
};
