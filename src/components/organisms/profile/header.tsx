import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import {
  getProfilePic,
  updateProfilePic,
} from "../../../store/actions/profile";
import { resizeImage } from "../../../utils";

interface TProps {
  isOtherUser: boolean;
  userId?: string;
  coverPhoto?: string;
  avatar?: string;
  getProfilePic?: (
    userId: string,
    key: "avatar" | "coverPhoto"
  ) => (dispatch: any) => Promise<void>;
  updateProfilePic?: (
    userId: string,
    key: string,
    dataUrl: string,
    dataUrlSmall?: string
  ) => (dispatch: any) => Promise<void>;
}

interface TState {}

class Header extends Component<TProps, Readonly<TState>> {
  updateCover = false;

  componentDidMount() {
    const { userId, avatar, coverPhoto, getProfilePic } = this.props;

    if (getProfilePic && userId) {
      if (!avatar) getProfilePic(userId, "avatar");
      if (!coverPhoto) getProfilePic(userId, "coverPhoto");
    }
  }

  selectCoverPhoto = () => {
    this.updateCover = true;
    (document.getElementById("img-input") as HTMLElement).click();
  };

  selectAvatar = () => {
    this.updateCover = false;
    (document.getElementById("img-input") as HTMLElement).click();
  };

  processPic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgInput = e.target;
    if (imgInput.files && imgInput.files[0]) {
      const imgReader = new FileReader();
      // const key = this.updateCover ? "coverPhoto" : "avatar";
      const files = imgInput.files as FileList;

      imgReader.onload = (err: any) => {
        if (files[0].size > 100000)
          resizeImage(err.target.result.toString(), files[0].type).then(
            (dataUrl: any) => {
              if (this.updateCover) {
                this.updatePic(dataUrl);
              } else {
                resizeImage(
                  err.target.result.toString(),
                  files[0].type,
                  50
                ).then((dataUrlSmall: any) => {
                  this.updatePic(dataUrl, dataUrlSmall);
                });
              }
            }
          );
        else this.updatePic(err.target.result);
      };

      imgReader.readAsDataURL(files[0]);
    }
  };

  updatePic = (dataUrl: string, dataUrlSmall = "") => {
    const { updateProfilePic, userId } = this.props;
    if (updateProfilePic && userId) {
      if (this.updateCover) {
        this.setState({ loadingCoverPhoto: true });
        updateProfilePic(userId, "coverPhoto", dataUrl);
      } else {
        this.setState({ loadingAvatar: true });
        updateProfilePic(userId, "avatar", dataUrl, dataUrlSmall);
      }
    }
  };

  render() {
    const { isOtherUser, coverPhoto, avatar } = this.props;
    const loadingCoverPhoto = coverPhoto === undefined;
    const loadingAvatar = avatar === undefined;

    return (
      <div className="pics">
        <div className={`cover main ${loadingCoverPhoto ? "disable" : ""}`}>
          <input
            accept="image/*"
            type="file"
            name="img-input"
            id="img-input"
            onChange={this.processPic}
          />
          {coverPhoto ? (
            <div className="cover-img main">
              <img src={coverPhoto} alt="Cover" />
            </div>
          ) : (
            <div
              className={`cover-placeholder ${
                loadingCoverPhoto ? "loading-pic" : ""
              }`}
            ></div>
          )}
          {!isOtherUser && (
            <button onClick={this.selectCoverPhoto}>
              <div>
                <FontAwesomeIcon icon={faCamera} />
                <span>Update Cover Photo</span>
              </div>
            </button>
          )}
        </div>
        <div className="avatar">
          <div
            className={`avatar-container main ${
              loadingAvatar ? "disable" : ""
            }`}
          >
            {avatar ? (
              <div className="avatar-img main">
                <img src={avatar} alt="Profile Avatar" />
              </div>
            ) : (
              <div
                className={`avatar-placeholder ${
                  loadingAvatar ? "loading-pic" : ""
                }`}
              ></div>
            )}

            {!isOtherUser && (
              <div className="btn-container">
                <button onClick={this.selectAvatar}>
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  userId: state.auth.user.id,
  avatar: state.profile.avatar,
  coverPhoto: state.profile.coverPhoto,
});

export const ProfileHeader = connect<any>(mapStateToProps, {
  getProfilePic,
  updateProfilePic,
})(Header);
