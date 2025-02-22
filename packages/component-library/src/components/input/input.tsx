import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <label>
      {label}
      <input {...props} />
    </label>
  );
};
