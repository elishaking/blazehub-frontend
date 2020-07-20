import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../atoms";
import { CompositeButton } from "../molecules";

interface TProps {
  currentUser: any;
  addFriend: Function;
  userId: string;
  idx: number;
  N: number;
}

export const CurrentUser = ({
  currentUser,
  addFriend,
  userId,
  idx,
  N,
}: TProps) => {
  return (
    <div className="friend-container" key={userId}>
      <div className="friend-main">
        <div className="friend-inner">
          {currentUser.avatar ? (
            <Avatar avatar={currentUser.avatar} marginRight="1.5em" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
          )}
          <p>
            {currentUser.firstName} {currentUser.lastName}
          </p>
        </div>
        <CompositeButton
          icon={faUserPlus}
          loading={currentUser.adding}
          onClick={() => {
            addFriend(userId);
          }}
        >
          Add Friend
        </CompositeButton>
      </div>
      {idx !== N - 1 && <hr />}
    </div>
  );
};
