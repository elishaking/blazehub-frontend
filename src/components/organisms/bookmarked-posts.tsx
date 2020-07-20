import React from "react";

import Spinner from "../Spinner";
import { Post } from ".";
import { PostData } from "../../models/post";
import { AuthUser } from "../../models/auth";

interface TProps {
  loading: boolean;
  posts: PostData[];
  user: AuthUser;
}

export const BookmarkedPosts = ({ loading, posts, user }: TProps) => {
  return (
    <div className="bookmarks">
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
            padding: "1em 0",
            fontWeight: 500,
          }}
        >
          You have not bookmarked any posts yet
        </h3>
      ) : (
        posts.map((post) => <Post key={post.key} post={post} user={user} />)
      )}
    </div>
  );
};
