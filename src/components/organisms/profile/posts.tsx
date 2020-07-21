import React from "react";

import { Posts } from "../../../containers";

interface TProps {
  user: any;
  isOtherUser: boolean;
  loadingOtherUserId: boolean;
  otherUserId: string;
}

export const ProfilePosts = ({
  user,
  isOtherUser,
  loadingOtherUserId,
  otherUserId,
}: TProps) => {
  return (
    <div className="user-posts">
      {isOtherUser ? (
        !loadingOtherUserId && (
          <Posts
            user={user}
            forProfile={true}
            otherUser={isOtherUser}
            otherUserId={otherUserId}
          />
        )
      ) : (
        <Posts user={user} forProfile={true} />
      )}
    </div>
  );
};
