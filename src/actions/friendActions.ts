import axios from "axios";
import app from "firebase/app";
import "firebase/database";
import { SET_FRIENDS, ADD_FRIEND } from "./types";

// ===ACTIONS===

export const setFriends = (friendsData: any[]) => ({
  type: SET_FRIENDS,
  payload: friendsData
});

export const setFriend = (friendData: any) => ({
  type: ADD_FRIEND,
  payload: friendData
});

// ===ACTION CREATORS===

// @action-type SET_FRIENDS
// @description get user friends
export const getFriends = (userKey: string) => async (dispatch: any) => {
  await axios
    .post("/api/friends", { userKey })
    .then(async res => {
      const friends = res.data.data;
      dispatch(setFriends(friends));

      const friendsWithAvatars: any = {};
      const avatarPromises = Object.keys(friends).map(friendKey =>
        app
          .database()
          .ref("profile-photos")
          .child(friendKey)
          .child("avatar-small")
          .once("value")
      );

      await Promise.all(avatarPromises).then(avatarSnapShots => {
        avatarSnapShots.forEach((avatarSnapShot: any) => {
          const friendKey = avatarSnapShot.ref.parent.key;
          friendsWithAvatars[friendKey] = {
            name: friends[friendKey].name,
            avatar: avatarSnapShot.exists() ? avatarSnapShot.val() : ""
          };
        });

        dispatch(setFriends(friendsWithAvatars));
      });
    })
    .catch(err => console.error(err));
};

// @action-type ADD_FRIEND
// @description add new friend
export const addFriend = (
  userKey: string,
  friendKey: string,
  friendData: any
) => async (dispatch: any) => {
  await axios
    .post("/api/friends/add", {
      userKey,
      friendKey,
      friend: friendData
    })
    .then(res => dispatch(setFriend(res.data.data)))
    .catch(err => console.error(err));
};
