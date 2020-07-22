import React, { HTMLProps } from "react";
import styled from "styled-components";
import { Button } from "../atoms";

interface TProps extends HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  handleFile?: (dataUrl: string) => void;
}

const Wrapper = styled.span`
  position: relative;

  input {
    visibility: hidden;
    position: absolute;
    left: 0;
    font-size: 0;
  }
`;

export const FileButton = ({
  children,
  handleFile,
  ...rest
}: Omit<TProps, "ref" | "as">) => {
  const selectFile = () => {
    // TODO: change to react ref
    const input = document.getElementById("file-input");
    input?.click();
  };

  const fileSelected = (e: any) => {
    const input = e.target;

    if (input.files && input.files[0] && handleFile) {
      const fileReader = new FileReader();

      fileReader.onload = (out: any) => {
        handleFile(out.target.result);
      };

      // only accepts images
      fileReader.readAsDataURL(input.files[0]);
    }
  };

  return (
    <Wrapper>
      <Button onClick={selectFile} {...rest}>
        {children}
      </Button>
      <input
        id="file-input"
        type="file"
        onChange={fileSelected}
        accept="image/*"
      />
    </Wrapper>
  );
};
