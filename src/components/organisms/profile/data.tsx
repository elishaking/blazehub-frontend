import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBible,
  faAddressBook,
  faGlobe,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../atoms";
import { EditProfile } from "./edit-profile";
import { logError } from "../../../utils";
import { validateProfileInput } from "../../../validation/profile";
import {
  updateProfileData,
  isValidUsername,
} from "../../../store/actions/profile";
import { ProfileData, ErrorProfileData } from "../../../models/profile";

interface TProps {
  isOtherUser: boolean;
  profileDetails: ProfileData;
  userId: string;
}

interface TState {
  loading: boolean;
  username: string;
  name: string;
  bio: string;
  location: string;
  website: string;
  birth: string;
  errors: ErrorProfileData;
  editProfile: boolean;
  [key: string]: any;
}

export class ProfileDetails extends Component<TProps, Readonly<TState>> {
  username: string;
  userId?: string;

  constructor(props: TProps) {
    super(props);

    const { profileDetails, userId } = props;
    this.username = profileDetails.username;
    this.userId = userId;

    // TODO: refactor this
    this.state = {
      loading: false,
      username: profileDetails.username,
      name: profileDetails.name,
      bio: profileDetails.bio,
      location: profileDetails.location,
      website: profileDetails.website,
      birth: profileDetails.birth,
      errors: {},
      editProfile: false,
    };
  }

  render() {
    const {
      username,
      name,
      bio,
      location,
      website,
      birth,
      errors,
      editProfile,
      loading,
    } = this.state;

    const { isOtherUser } = this.props;
    return (
      <>
        <div className="data-container">
          <h3>
            <FontAwesomeIcon icon={faUser} />
            <span>{name}</span>
          </h3>
          {bio && (
            <div className="data">
              <FontAwesomeIcon icon={faBible} />
              <small>{bio}</small>
            </div>
          )}
          {location && (
            <div className="data">
              <FontAwesomeIcon icon={faAddressBook} />
              <small>{location}</small>
            </div>
          )}
          {website && (
            <div className="data">
              <FontAwesomeIcon icon={faGlobe} />
              <small>{website}</small>
            </div>
          )}
          {birth && (
            <div className="data">
              <FontAwesomeIcon icon={faBaby} />
              <small>{birth}</small>
            </div>
          )}
          {!isOtherUser && (
            <Button className="btn" onClick={this.toggleEditProfile}>
              Edit Profile
            </Button>
          )}
        </div>
        {editProfile && (
          <EditProfile
            onChange={this.onChange}
            editProfile={this.editProfile}
            profileData={{
              bio,
              birth,
              username,
              location,
              name,
              website,
            }}
            errors={errors}
            loading={loading}
            toggleEditProfile={this.toggleEditProfile}
          />
        )}
      </>
    );
  }

  toggleEditProfile = () => {
    this.setState({ editProfile: !this.state.editProfile });
  };

  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.userId) return;

    const { username, name, bio, location, website, birth } = this.state;
    const { isValid, errors } = validateProfileInput({
      username,
      name,
      bio,
      location,
      website,
      birth,
    });
    if (!isValid) return this.setState({ errors });

    this.setState({ loading: true });
    try {
      if (username !== this.username) {
        const valid = await isValidUsername(username);
        if (!valid) {
          errors.username = "This username is already taken";
          return this.setState({ loading: false, errors });
        }
      }

      await updateProfileData(
        { username, name, bio, location, website, birth },
        this.userId
      );
      this.setState({ loading: false });
      this.toggleEditProfile();
    } catch (err) {
      logError(err);
    }
  };
}
