import React from "react";

import { TextFormInput, Spinner } from "../../molecules";
import { DateFormInput } from "../../form/DateFormInput";
import { TextAreaFormInput } from "../../form/TextFormInput";
import { ProfileData } from "../../../models/profile";

interface TProps {
  toggleEditProfile: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  onChange: any; // (event: React.ChangeEvent<HTMLInputElement>) => void;
  editProfile: (event: React.FormEvent<HTMLFormElement>) => void;
  profileData: ProfileData;
  errors: any;
  loading: boolean;
}

export const EditProfile = ({
  toggleEditProfile,
  onChange,
  editProfile,
  profileData,
  errors,
  loading,
}: TProps) => {
  return (
    <div className="edit-profile">
      <div className="inner-content">
        <div className="modal">
          <div className="close" onClick={toggleEditProfile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 49.243 49.243"
            >
              <g
                id="Group_153"
                data-name="Group 153"
                transform="translate(-2307.379 -2002.379)"
              >
                <line
                  id="Line_1"
                  data-name="Line 1"
                  x2="45"
                  y2="45"
                  transform="translate(2309.5 2004.5)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="7"
                />
                <line
                  id="Line_2"
                  data-name="Line 2"
                  x1="45"
                  y2="45"
                  transform="translate(2309.5 2004.5)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </g>
            </svg>
          </div>

          <form onSubmit={editProfile}>
            <label htmlFor="username">Username</label>
            <TextFormInput
              name="username"
              placeholder="username"
              type="text"
              value={profileData.username}
              onChange={onChange}
              error={errors.username}
            />

            <label htmlFor="name">Name</label>
            <TextFormInput
              name="name"
              placeholder="name"
              type="text"
              value={profileData.name}
              onChange={onChange}
              error={errors.name}
            />

            <label htmlFor="name">Bio</label>
            <TextAreaFormInput
              name="bio"
              placeholder="bio"
              value={profileData.bio}
              onChange={onChange}
              error={errors.bio}
            />

            <label htmlFor="location">Location</label>
            <TextFormInput
              name="location"
              placeholder="location"
              value={profileData.location}
              type="text"
              onChange={onChange}
              error={errors.location}
            />

            <label htmlFor="website">Website</label>
            <TextFormInput
              name="website"
              placeholder="website"
              value={profileData.website}
              type="text"
              onChange={onChange}
              error={errors.website}
            />

            <label htmlFor="birth">Birth Date</label>
            <DateFormInput
              name="birth"
              placeholder="birth"
              value={profileData.birth}
              onChange={onChange}
              error={errors.birth}
            />

            {loading ? (
              <Spinner />
            ) : (
              <input type="submit" value="Save" className="btn" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
