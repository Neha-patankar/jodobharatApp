import React from 'react';

const Input = ({ className, onChange, placeholder, ...props }) => {
    return (
      <input
        type="text"
        className={`border rounded p-2 ${className || ''}`}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    );
  };
  
  export default Input;