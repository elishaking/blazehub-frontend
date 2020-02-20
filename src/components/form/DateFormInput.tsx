import React from "react";

interface DateFormInputProps {
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  value?: string;
}

export function DateFormInput({
  name,
  placeholder,
  onChange,
  error,
  value
}: DateFormInputProps) {
  return (
    <div className="form-input" data-test="dateFormInputComponent">
      <input
        type="date"
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
