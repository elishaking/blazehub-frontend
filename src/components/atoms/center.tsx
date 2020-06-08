import styled from "styled-components";

interface CenterProps {
  direction?: "column" | "row";
  shrink?: boolean;
}

export const Center = styled.div<CenterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.direction};
  height: ${(props) => !props.shrink && "100vh"};
`;
