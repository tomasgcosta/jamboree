import React from "react";

export const Btn = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="tracking-wider font-sfdisplay-bold mt-3 cursor-pointer rounded-lg p-3 bg-botaonNormal text-white flex justify-center items-center w-[15rem]"
    >
      <button className="tracking-wider uppercase font-sfdisplay-medium">{props.name}</button>
    </div>
  );
};
