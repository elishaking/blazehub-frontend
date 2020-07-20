import React from "react";
import { faImage, faSmile } from "@fortawesome/free-solid-svg-icons";

import IconButton from "../Button";
import { Button } from "../atoms";

interface TProps {
  showImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectImage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectEmoticon: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  createPost: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const PostActions = ({
  showImage,
  selectImage,
  selectEmoticon,
  createPost,
}: TProps) => {
  return (
    <div className="create-post-actions">
      <div className="icon-btns">
        <div id="select-image">
          <input
            type="file"
            name="image"
            id="post-img"
            onChange={showImage}
            accept="image/*"
          />

          <IconButton icon={faImage} onClick={selectImage} />
        </div>

        <IconButton icon={faSmile} onClick={selectEmoticon} />
      </div>
      <Button className="btn" onClick={createPost} data-test="createPostBtn">
        Post
      </Button>
    </div>
  );
};
