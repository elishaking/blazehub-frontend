import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import app from "firebase/app";
import "firebase/database";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { getFriends, addFriend } from "../actions/friend";
import { Friends, Friend } from "../models/friend";

import MainNav from "../containers/nav/MainNav";
import AuthNav from "../containers/nav/AuthNav";
import Spinner from "../components/Spinner";
import Avatar from "../components/Avatar";
import { AuthState } from "../models/auth";
import { CompositeButton } from "../components/molecules";

interface FindFriendsProps extends RouteComponentProps {
  auth: AuthState;
  friends: Friends;
  getFriends: () => (dispatch: any) => Promise<void>;
  addFriend: (
    friendId: string,
    friendData: Friend
  ) => (dispatch: any) => Promise<void>;
}

class FindFriends extends Component<FindFriendsProps, Readonly<any>> {
  userId: string;

  constructor(props: FindFriendsProps) {
    super(props);

    this.state = {
      users: {},
      loading: true,
    };

    this.userId = this.getUserKey(this.props.auth.user.email);
  }

  componentDidMount() {
    if (Object.keys(this.props.friends).length === 0) {
      this.props.getFriends();
    }

    axios.get("/friends/new").then((res) => {
      const users = res.data;
      delete users.blazebot;
      delete users[this.userId];

      const friendIds = Object.keys(this.props.friends);
      Object.keys(users).forEach((userId) => {
        if (friendIds.indexOf(userId) !== -1) delete users[userId];
      });
      // if (Object.keys(users).length == 2) users = {}
      this.setState({
        users,
        loading: false,
      });
    });
  }

  componentWillReceiveProps(nextProps: any) {
    const friendIds = Object.keys(nextProps.friends);
    const { users } = this.state;

    Object.keys(users).forEach((userId) => {
      if (friendIds.indexOf(userId) !== -1) delete users[userId];
    });
    // if (Object.keys(users).length == 2) users = {}

    const userAvatarPromises = Object.keys(users).map((userId) =>
      app
        .database()
        .ref("profile-photos")
        .child(userId)
        .child("avatar-small")
        .once("value")
    );

    Promise.all(userAvatarPromises).then((userAvatarSnapShots) => {
      userAvatarSnapShots.forEach((userAvatarSnapShot: any) => {
        if (userAvatarSnapShot.exists()) {
          users[
            userAvatarSnapShot.ref.parent.key
          ].avatar = userAvatarSnapShot.val();
        }
      });
    });

    this.setState({
      users,
    });
  }

  /** @param {string} userEmail */
  getUserKey = (userEmail: string) =>
    userEmail.replace(/\./g, "~").replace(/@/g, "~~");

  addFriend = (friendId: string) => {
    const { users } = this.state;
    users[friendId].adding = true;
    this.setState({
      users,
    });

    const newFriend = users[friendId];
    const friendData = {
      name: `${newFriend.firstName} ${newFriend.lastName}`,
    };
    this.props.addFriend(friendId, friendData);
  };

  render() {
    const { users, loading } = this.state;
    const { user } = this.props.auth;
    const userIds = Object.keys(users);

    return (
      <div className="container">
        <AuthNav history={this.props.history} />

        <div className="main">
          <MainNav user={user} />

          <div className="friends-main">
            {loading ? (
              <Spinner />
            ) : userIds.length === 0 ? (
              <div style={{ textAlign: "center", padding: "1em 0" }}>
                <h3 style={{ fontWeight: 500 }}>No friends to add</h3>
              </div>
            ) : (
              userIds.map((userId, idx, arr) => {
                const currentUser = users[userId];
                return (
                  <div className="friend-container" key={userId}>
                    <div className="friend-main">
                      <div className="friend-inner">
                        {currentUser.avatar ? (
                          <Avatar
                            avatar={currentUser.avatar}
                            marginRight="1.5em"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            className="icon"
                          />
                        )}
                        <p>
                          {currentUser.firstName} {currentUser.lastName}
                        </p>
                      </div>
                      {/* {currentUser.adding ? (
                        <Spinner full={false} />
                      ) : (
                        <button
                          className="btn"
                          onClick={e => {
                            this.addFriend(userId);
                          }}
                        >
                          <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                        </button>
                      )} */}
                      <CompositeButton
                        icon={faUserPlus}
                        loading={currentUser.adding}
                        onClick={() => {
                          this.addFriend(userId);
                        }}
                      >
                        Add Friend
                      </CompositeButton>
                    </div>
                    {idx !== arr.length - 1 && <hr />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  friends: state.friends,
});

export default connect<any>(mapStateToProps, { getFriends, addFriend })(
  FindFriends
);
