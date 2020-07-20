import axios from "axios";
import app from "firebase/app";
import "firebase/database";

import { SET_FRIENDS, ADD_FRIEND } from "./types";
import { Friends, Friend } from "../../models/friend";
import { logError } from "../../utils";

// ===ACTIONS===

export const setFriends = (friendsData: Friends) => ({
  type: SET_FRIENDS,
  payload: friendsData,
});

export const setFriend = (friendData: Friend) => ({
  type: ADD_FRIEND,
  payload: friendData,
});

// ===ACTION CREATORS===

// @action-type SET_FRIENDS
// @description get user friends
export const getFriends = () => async (dispatch: any) => {
  try {
    const res = await axios.get("/friends");

    const friends = res.data;
    dispatch(setFriends(friends));

    const friendsWithAvatars: any = {};
    const avatarPromises = Object.keys(friends).map((friendId) =>
      app
        .database()
        .ref("profile-photos")
        .child(friendId)
        .child("avatar-small")
        .once("value")
    );

    const avatarSnapShots = await Promise.all(avatarPromises);
    avatarSnapShots.forEach((avatarSnapShot: any) => {
      const friendId = avatarSnapShot.ref.parent.key;
      friendsWithAvatars[friendId] = {
        name: friends[friendId].name,
        avatar: avatarSnapShot.exists() ? avatarSnapShot.val() : "",
      };
    });

    dispatch(setFriends(friendsWithAvatars));
  } catch (err) {
    logError(err);
  }
};

// @action-type ADD_FRIEND
// @description add new friend
export const addFriend = (friendId: string, friendData: Friend) => async (
  dispatch: any
) => {
  await axios
    .post("friends/add", {
      friendId,
      friend: friendData,
    })
    .then((res) => dispatch(setFriend(res.data.data)))
    .catch((err) => {
      // console.error(err)
      logError(err);
    });
};
