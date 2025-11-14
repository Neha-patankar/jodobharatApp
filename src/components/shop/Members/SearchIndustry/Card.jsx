import React from 'react';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`bg-white border rounded-lg p-0 shadow-md hover:shadow-lg transition duration-300 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export default Card;