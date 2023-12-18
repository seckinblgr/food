import React from "react";

const InfoBox = ({ children , type}) => {
  return (
    <div>
      <div className={`text-center bg-${type}-200 p-4  mb-4 rounded-full`} >
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
