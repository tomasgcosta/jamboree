import React from "react";

export const BtnEngano = (props) => {
  return (
    <div className="mt-5 cursor-pointer text-registate flex justify-center items-center  ">
      <button className="font-sfdisplay-semibold  border-b-2 border-black">
        {props.name}
      </button>
    </div>
  );
};
