import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface TProps {
  loadingCoverPhoto: boolean;
  loadingAvatar: boolean;
  coverPhoto: string;
  avatar: string;
  selectCoverPhoto: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  selectAvatar: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  processPic: (event: React.ChangeEvent<HTMLInputElement>) => void;
  otherUser: any;
}

export const ProfileHeader = ({
  loadingCoverPhoto,
  loadingAvatar,
  coverPhoto,
  avatar,
  selectCoverPhoto,
  selectAvatar,
  processPic,
  otherUser,
}: TProps) => {
  return (
    <div className="pics">
      <div className={`cover main ${loadingCoverPhoto ? "disable" : ""}`}>
        <input
          accept="image/*"
          type="file"
          name="img-input"
          id="img-input"
          onChange={processPic}
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
        {!otherUser && (
          <button onClick={selectCoverPhoto}>
            <div>
              <FontAwesomeIcon icon={faCamera} />
              <span>Update Cover Photo</span>
            </div>
          </button>
        )}
      </div>
      <div className="avatar">
        <div
          className={`avatar-container main ${loadingAvatar ? "disable" : ""}`}
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

          {!otherUser && (
            <div className="btn-container">
              <button onClick={selectAvatar}>
                <FontAwesomeIcon icon={faCamera} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
