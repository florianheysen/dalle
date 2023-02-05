import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: any;
  handleChange: any;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: any;
}

function FormField(props: FormFieldProps) {
  const {
    label,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
  } = props;
  return (
    <>
      <div className="flex items-center mt-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="ml-2 font-semibold text-xs bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded text-black"
          >
            Surprise me
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
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      />
    </>
  );
}

export default FormField;
