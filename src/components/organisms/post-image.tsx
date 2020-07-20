import React from "react";

import { CloseIcon } from "../atoms";

interface Tprops {
  postImgDataUrl: string;
  removeImage: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PostImage = ({ postImgDataUrl, removeImage }: Tprops) => {
  return (
    <div className="post-img">
      {postImgDataUrl && (
        <div className="img-container">
          <img src={postImgDataUrl} alt="Post" />
          <div className="close" onClick={removeImage}>
            <CloseIcon />
          </div>
        </div>
      )}
    </div>
  );
};
