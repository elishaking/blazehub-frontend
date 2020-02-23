import React from "react";
import "./TextFormInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  name: string;
  placeholder: string;
  error: string;
  value?: string;
}

interface TextFormInputProps extends InputProps {
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextIconFormInputProps extends InputProps {
  type: string;
  icon: IconDefinition;
  onChange: () => void;
}

interface TextAreaFormInputProps extends InputProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextFormInput({
  type,
  name,
  placeholder,
  onChange,
  error,
  value
}: TextFormInputProps) {
  return (
    <div className="form-input" data-test="textFormInputComponent">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`fill-parent ${error ? "error" : ""}`}
        onChange={onChange}
      />
      {error && <small>{error}</small>}
    </div>
  );
}

export function TextIconFormInput({
  type,
  name,
  placeholder,
  onChange,
  error,
  value,
  icon
}: TextIconFormInputProps) {
  return (
    <div
      className="form-input icon-input"
      data-test="textIconFormInputComponent"
    >
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`fill-parent ${error ? "error" : ""}`}
        onChange={onChange}
      />
      {error && <small>{error}</small>}
      <FontAwesomeIcon icon={icon} className="icon" />
    </div>
  );
}

export function TextAreaFormInput({
  name,
  placeholder,
  onChange,
  error,
  value
}: TextAreaFormInputProps) {
  return (
    <div className="form-input" data-test="textAreaFormInputComponent">
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        rows={3}
        style={{ resize: "none" }}
        className={`fill-parent ${error ? "error" : ""}`}
        onChange={onChange}
      />
      {error && <small>{error}</small>}
    </div>
  );
}
