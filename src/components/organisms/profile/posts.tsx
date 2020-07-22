import React from "react";

import { Posts } from "../../../containers";

interface TProps {
  user: any;
  isOtherUser: boolean;
  otherUserId: string;
}

export const ProfilePosts = ({ user, isOtherUser, otherUserId }: TProps) => {
  return (
    <div className="user-posts">
      {isOtherUser ? (
        <Posts
          user={user}
          forProfile={true}
          otherUser={isOtherUser}
          otherUserId={otherUserId}
        />
      ) : (
        <Posts user={user} forProfile={true} />
      )}
    </div>
  );
};
