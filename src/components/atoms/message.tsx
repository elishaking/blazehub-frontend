import styled, { css } from "styled-components";

const commonStyle = css`
  margin: 1.3em auto;
  padding: 0.3em 0.7em;
  border-radius: 10px;
  text-align: center;
  width: fit-content;
`;

export const ErrorMessage = styled.h3`
  ${commonStyle};

  color: rgb(167, 44, 44);
  background-color: rgba(255, 0, 0, 0.3);
  border: 1px solid rgb(167, 44, 44);
`;

export const SuccessMessage = styled.h3`
  ${commonStyle};

  color: rgb(167, 44, 44);
  background-color: rgba(255, 0, 0, 0.3);
  border: 1px solid rgb(167, 44, 44);
`;
