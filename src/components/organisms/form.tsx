import React, { HTMLProps } from "react";
import styled from "styled-components";

interface FormProps extends HTMLProps<HTMLFormElement> {
  headingText?: string;
  children: React.ReactNode;
}

const Wrapper = styled.form`
  .form-input {
    margin-bottom: 1em;
  }
`;

export const Form = ({
  headingText,
  children,
  ...rest
}: Omit<FormProps, "ref" | "as">) => {
  return (
    <Wrapper {...rest}>
      {headingText && <h3>{headingText}</h3>}
      {children}
    </Wrapper>
  );
};
