import React, { useEffect } from "react";

export interface InputProps {
  autocomplete?: "on" | "off";
  className?: string;
  disabled?: boolean;
  label: string;
  maxLength?: number;
  minLength?: number;
  name: string;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  "data-testid"?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onRender?: () => void;
}

export const Input = ({ onRender, ...props }: InputProps) => {
  // Only fire on componentDidMount
  useEffect(() => {
    onRender?.();
  }, []);

  return (
    <label>
      <input {...props} />
    </label>
  );
};
