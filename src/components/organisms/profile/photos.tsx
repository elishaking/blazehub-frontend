import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import { FileButton, Spinner } from "../../molecules";
import { Button, CloseIcon } from "../../atoms";
import { resizeImage } from "../../../utils";
import { uploadPhotos, fetchPhotos } from "../../../store/actions/profile";

interface TProps {
  isOtherUser: boolean;
  userId: string;
}

interface TState {
  photos: string[];
  pendingPhotos: string[];
  uploading: boolean;
  loading: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  img {
    object-fit: cover;
  }

  img.uploaded-images {
    width: 30%;
    margin-right: 3%;
    margin-bottom: 3%;
  }
`;

const ImageWrapper = styled.div`
  width: 30%;
  position: relative;
  margin-right: 3%;
  margin-bottom: 3%;

  img {
    width: 100%;
  }

  .remove-image {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: rgb(0 0 0 / 57%);
    display: flex;
    padding: 0.3em;
    border-radius: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  .remove-image:hover {
    background-color: rgb(0 0 0);
  }

  svg {
    font-size: 10px;
  }
`;

export class ProfilePhotos extends Component<TProps, Readonly<TState>> {
  state = {
    photos: [],
    pendingPhotos: [],
    loading: true,
    uploading: false,
  };

  componentDidMount() {
    this.fetchAllPhotos();
  }

  render() {
    const { isOtherUser } = this.props;
    const { photos, pendingPhotos, uploading, loading } = this.state;

    if (loading)
      return (
        <div className="data-container">
          <h3>
            <FontAwesomeIcon icon={faImages} />
            <span>Photos</span>
          </h3>
          <Spinner />
        </div>
      );

    return (
      <div className="data-container">
        <h3>
          <FontAwesomeIcon icon={faImages} />
          <span>Photos</span>
        </h3>

        {photos && (
          <Wrapper>
            {photos.map((photo, idx) => {
              return (
                <img
                  key={idx}
                  className="uploaded-images"
                  src={photo}
                  alt="profile img"
                />
              );
            })}
          </Wrapper>
        )}

        {photos.length > 0 && pendingPhotos.length > 0 && (
          <hr style={{ margin: "1em" }} />
        )}

        {pendingPhotos && (
          <Wrapper>
            {pendingPhotos.map((photo, idx) => {
              return (
                <ImageWrapper key={idx}>
                  <img src={photo} alt="pending profile img" />
                  <div
                    className="remove-image"
                    onClick={(e) => this.removePhoto(idx)}
                  >
                    <CloseIcon />
                  </div>
                </ImageWrapper>
              );
            })}
          </Wrapper>
        )}

        {!isOtherUser && (
          <FileButton className="btn" handleFile={this.handlePhoto}>
            Add Photo
          </FileButton>
        )}

        {!isOtherUser &&
          pendingPhotos.length > 0 &&
          (uploading ? (
            <Spinner />
          ) : (
            <Button onClick={this.uploadAllPhotos}>Upload</Button>
          ))}
      </div>
    );
  }

  handlePhoto = (dataUrl: string) => {
    this.setState((state, props) => ({
      pendingPhotos: [...state.pendingPhotos, dataUrl],
    }));
  };

  removePhoto = (idx: number) => {
    this.setState((state, props) => ({
      pendingPhotos: [
        ...state.pendingPhotos.slice(0, idx),
        ...state.pendingPhotos.slice(idx + 1),
      ],
    }));
  };

  fetchAllPhotos = async () => {
    const photos = await fetchPhotos(this.props.userId);
    this.setState({
      loading: false,
      photos,
    });
  };

  uploadAllPhotos = async () => {
    // TODO: review this code
    const { pendingPhotos, photos } = this.state;
    this.setState({ uploading: true });
    const resizedPhotos = await Promise.all(
      pendingPhotos.map((photo) => resizeImage(photo))
    );
    await uploadPhotos(this.state.pendingPhotos, this.props.userId);

    this.setState({
      photos: [...photos, ...resizedPhotos],
      pendingPhotos: [],
      uploading: false,
    });
  };
}
