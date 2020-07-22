import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, match } from "react-router-dom";
import app from "firebase/app";
import "firebase/database";

import "./Profile.scss";
import { getFriends } from "../store/actions/friend";

import { Friends } from "../models/friend";
import { AuthState } from "../models/auth";
import { ProfileData } from "../models/profile";
import {
  ProfileHeader,
  ProfilePosts,
  ProfileDetails,
  ProfileFriends,
  ProfilePhotos,
} from "../components/organisms";
import { PageTemplate } from "../components/templates";
import { Spinner } from "../components/molecules";
import {
  fetchProfileDetails,
  fetchProfileDetailsById,
} from "../store/actions/profile";
// import { createProfileForExistingUser, createSmallAvatar } from '../../utils/firebase';

interface Params {
  username: string;
}

interface ProfileProps extends RouteComponentProps {
  match: match<Params>;
  auth: AuthState;
  friends: Friends;
  profile: any;
  getFriends: () => (dispatch: any) => Promise<void>;
}

interface TState {
  loadingProfile: boolean;
  loadingFriends: boolean;
  friends: any[];
}

class Profile extends Component<ProfileProps, Readonly<TState>> {
  updateCover = false;
  isOtherUser = true;
  db = app.database();
  profileRef: app.database.Reference;
  profileDetails?: ProfileData;
  otherUserId = "";

  constructor(props: ProfileProps) {
    super(props);

    this.state = {
      loadingProfile: true,
      loadingFriends: true,
      friends: [],
    };

    this.profileRef = this.db.ref("profiles").child(this.props.auth.user.id);
  }

  componentDidMount() {
    // createSmallAvatar();
    if (this.props.match.params && this.props.match.params.username) {
      this.isOtherUser = true;
      this.fetchOtherUserDetails();
    } else {
      this.isOtherUser = false;
      // const { user } = this.props.auth;
      // this.setState({ name: `${user.firstName} ${user.lastName}` });
      this.fetchDetails();
      this.fetchFriends();
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.friends) {
      const { friends } = this.state;
      const friendKeys = Object.keys(nextProps.friends);
      if (friends.length !== friendKeys.length) {
        this.setFriends(friendKeys, nextProps.friends);
      }
    }
  }

  render() {
    const { user } = this.props.auth;
    const {
      loadingProfile,
      // loadingFriends,
      friends,
    } = this.state;
    const userId = this.isOtherUser
      ? this.otherUserId
      : this.props.auth.user.id;

    if (loadingProfile)
      return (
        <PageTemplate>
          <Spinner style={{ flex: 1 }} />
        </PageTemplate>
      );

    return (
      <PageTemplate>
        <div className="profile">
          <ProfileHeader
            otherUserId={this.isOtherUser ? this.otherUserId : ""}
          />

          <div className="profile-content">
            <ProfilePosts
              user={user}
              isOtherUser={this.isOtherUser}
              otherUserId={this.otherUserId}
            />

            <div className="user-data">
              <ProfileDetails
                isOtherUser={this.isOtherUser}
                userId={userId}
                profileDetails={this.profileDetails || ({} as ProfileData)}
              />

              {/* TODO: fetch friends inside the component below */}
              <ProfileFriends
                friends={friends}
                findFriends={this.findFriends}
                isOtherUser={this.isOtherUser}
              />

              <ProfilePhotos isOtherUser={this.isOtherUser} userId={userId} />
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  fetchDetails = () => {
    fetchProfileDetailsById(this.props.auth.user.id).then((detailsSnapshot) => {
      if (detailsSnapshot.exists()) {
        this.profileDetails = detailsSnapshot.val();
        this.setState({ loadingProfile: false });
      }
    });
  };

  fetchOtherUserDetails = () => {
    fetchProfileDetails(this.props.match.params.username).then(
      (detailsSnapshot) => {
        // TODO: create profile for user that does not have one
        if (!detailsSnapshot.exists()) return (window.location.href = "/home");

        const profile = detailsSnapshot.val();
        this.otherUserId = Object.keys(profile)[0];
        this.profileDetails = profile[this.otherUserId];
        this.setState({ loadingProfile: false });
        this.fetchOtherFriends();
        // this.loadOtherUserProfilePhotos();
      }
    );
  };

  setFriends = (friendKeys: string[], friends: any) => {
    this.setState({
      friends: friendKeys.slice(0, 7).map((friendKey) => ({
        key: friendKey,
        ...friends[friendKey],
      })),
    });
  };

  fetchOtherFriends = () => {
    // TODO: rectify this
    this.db
      .ref("friends")
      .child(this.otherUserId)
      .once("value")
      .then((friendsSnapShot) => {
        if (friendsSnapShot.exists()) {
          const friends = friendsSnapShot.val();
          this.setFriends(Object.keys(friends), friends);
        }
      });
  };

  fetchFriends = () => {
    const { friends } = this.props;

    const friendKeys = Object.keys(friends);
    friendKeys.length === 0
      ? this.props.getFriends()
      : this.setFriends(friendKeys, friends);

    // createProfileForExistingUser();
  };

  findFriends = () => {
    this.props.history.push("/find");
  };
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  friends: state.friends,
  profile: state.profile,
});

export const ProfilePage = connect<any>(mapStateToProps, {
  getFriends,
})(Profile);
