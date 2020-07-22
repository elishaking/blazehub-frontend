import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../atoms";

interface TProps {
  isOtherUser: boolean;
}

export class ProfilePhotos extends Component<TProps> {
  render() {
    const { isOtherUser } = this.props;

    return (
      <div className="data-container">
        <h3>
          <FontAwesomeIcon icon={faImages} />
          <span>Photos</span>
        </h3>

        {!isOtherUser && <Button className="btn">Add Photo</Button>}
      </div>
    );
  }
}
