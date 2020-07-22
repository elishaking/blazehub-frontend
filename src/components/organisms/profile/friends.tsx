import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleCarry, faUser } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../atoms";

interface TProps {
  friends: any[];
  isOtherUser: boolean;
  findFriends: () => void;
}

export const ProfileFriends = ({
  friends,
  isOtherUser,
  findFriends,
}: TProps) => {
  return (
    <div className="data-container">
      <h3>
        <FontAwesomeIcon icon={faPeopleCarry} />
        <span>Friends</span>
      </h3>

      {friends.length > 0 &&
        friends.map((friend: any) => (
          <div key={friend.key} className="data">
            <FontAwesomeIcon icon={faUser} />
            <small>{friend.name}</small>
          </div>
        ))}

      {!isOtherUser && (
        <Button className="btn" onClick={findFriends}>
          Find Friends
        </Button>
      )}
    </div>
  );
};
