import app from "firebase/app";
import "firebase/database";
import axios from "axios";
import { resizeImage } from "./resizeImage";

export const initializeApp = (obj: any) => {
  if (app.apps.length > 0) {
    obj.setupFirebase();
  } else {
    axios.get("/firebase/config").then((res) => {
      app.initializeApp(res.data);
      obj.setupFirebase();
    });
  }
};

// Home
export const updateUsername = () => {
  app
    .database()
    .ref("users")
    .once("value")
    .then((usersSnapShot) => {
      const users = usersSnapShot.val();
      Object.keys(users).forEach((userId) => {
        const newUsername = `${users[userId].firstName.replace(
          / /g,
          ""
        )}.${users[userId].lastName.replace(/ /g, "")}`.toLowerCase();
        usersSnapShot.child(userId).child("username").ref.set(newUsername);
      });
      // console.log(usersSnapShot.val());
    });
};

export const updatePostLikeKeys = () => {
  const db = app.database();
  db.ref("posts")
    .once("value")
    .then((postsSnapshot) => {
      const posts = postsSnapshot.val();

      Object.keys(posts).forEach((postKey) => {
        const postLikes = posts[postKey].likes;

        if (postLikes) {
          const postlikeUsersPromises: Promise<
            firebase.database.DataSnapshot
          >[] = [];

          Object.keys(postLikes).forEach((postLikeKey) => {
            postlikeUsersPromises.push(
              db
                .ref("users")
                .orderByChild("firstName")
                .equalTo(postLikeKey)
                .limitToFirst(1)
                .once("value")
            );
          });

          Promise.all(postlikeUsersPromises).then((snapshots) => {
            const newPostLikes: { [key: string]: any } = {};
            snapshots.forEach((snapshot) => {
              snapshot.forEach((user) => {
                newPostLikes[user.key as string] =
                  postLikes[user.val().firstName];
              });
            });

            db.ref("posts")
              .child(postKey)
              .child("likes")
              .set(newPostLikes)
              .then((v) => {
                // console.log(v);
                // console.log("done");
              });
          });
        }
      });
    });
};

// Profile
export const createSmallAvatar = () => {
  const profileRef = app.database().ref("profile-photos");
  profileRef.once("value").then((p) => {
    const pp = p.val();

    Object.keys(pp).forEach((key) => {
      const mime = pp[key].avatar.match(
        /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
      );
      resizeImage(pp[key].avatar, "image/jpeg", 50).then((sm) => {
        profileRef.child(key).child("avatar-small").set(sm);
      });
    });
  });
};

export const createProfileForExistingUser = () => {
  app
    .database()
    .ref("users")
    .once("value")
    .then((usersSnapShot) => {
      const users = usersSnapShot.val();
      const userIds = Object.keys(users);

      userIds.forEach((userId) => {
        const userProfileRef = app.database().ref("profiles").child(userId);

        userProfileRef
          .child("username")
          .once("value")
          .then((usernameSnapShot) => {
            usernameSnapShot.ref.set(
              `${users[userId].firstName.replace(/ /g, "")}.${users[
                userId
              ].lastName.replace(/ /g, "")}`.toLowerCase()
            );
          });

        userProfileRef
          .child("name")
          .once("value")
          .then((nameSnapShot) => {
            if (nameSnapShot.exists()) return;

            nameSnapShot.ref.set(
              `${users[userId].firstName} ${users[userId].lastName}`
            );
          });
      });
    });
};
