import React from 'react';

const TextBox = ({ data }) => {
  return (
    <div className="w-full max-w-md mx-auto p-13 bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Display each line of text inside the box */}
      <p className="text-lg mb-2">{data?.line1 || "Loading..."}</p>
      <p className="text-lg mb-2">{data?.line2 || "Loading..."}</p>
      <p className="text-lg mb-2">{data?.line3 || "Loading..."}</p>
      <p className="text-lg mb-2">{data?.line4 || "Loading..."}</p>
      <p className="text-lg mb-2">{data?.line5 || "Loading..."}</p>
    </div>
  );
};

export default TextBox;
