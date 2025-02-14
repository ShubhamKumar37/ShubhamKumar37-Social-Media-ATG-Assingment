import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({
  name,
  label = "",
  placeholder = "",
  divCss = "",
  css = "",
  type = "text",
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${divCss}`}>
      {label && <label className='mb-1 text-sm'>{label}</label>}
      <input
        {...register(name, { required: true })}
        type={type}
        {...rest}
        placeholder={placeholder}
        className={`relative w-full rounded-lg border border-gray-900 p-2 py-2 focus:outline-none ${css}`}
      />
      {errors[name] && (
        <p className='absolute mt-1 text-[13px] text-[#d72222]'>
          *This filed is required
        </p>
      )}
    </div>
  );
};

export default Input;
