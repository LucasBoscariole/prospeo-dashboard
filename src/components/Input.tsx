import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`flex items-center p-4 w-[417px] h-[48px] bg-white border border-[#E6E6E6] rounded-[8px] box-border placeholder:text-grey-600 text-dark ${props.className}`}
    />
  );
};
