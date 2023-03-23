import React from "react";
import { Form } from "react-router-dom";

const FormField = ({
  labelName,
  type,
  name,
  value,
  placeholder,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            onClick={handleSurpriseMe}
          >
            Surprise Me!
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-gray-300 border text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff]
         outline-none block w-full p-3"
      />
    </div>
  );
};

export default FormField;
