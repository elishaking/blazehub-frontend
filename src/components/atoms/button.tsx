import styled, { css } from "styled-components";

interface ButtonProps {}

const commonStyle = css`
  cursor: pointer;
  padding: 1em 2em;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-decoration: none;
  outline: none;
  transition: 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  ${commonStyle}
  background: #7c62a9;
  color: white;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const OutlineButton = styled.button`
  ${commonStyle}
  background: white;
  color: #7c62a9;
  border: 1px solid #7c62a9;
`;
