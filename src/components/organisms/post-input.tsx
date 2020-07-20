import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface TProps {
  postText: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PostInput = ({ postText, onChange }: TProps) => {
  return (
    <div className="icon-input">
      <textarea
        name="postText"
        placeholder="Share your thoughts"
        rows={3}
        value={postText}
        onChange={onChange}
      ></textarea>
      <FontAwesomeIcon icon={faUserAlt} className="icon" />
    </div>
  );
};
