import styled from "styled-components";

export const Input = styled.input`
  font-family: "Poppins", sans-serif;
  border: 1px solid #7c62a9;
  border-radius: 10px;
  padding: 0.7em 1.3em;
  transition: 0.3s ease-in-out;
  outline: none;
  width: 100%;

  &:focus {
    box-shadow: 0 0 8px 0 #b1a3e1;
    outline: none;
  }
`;
