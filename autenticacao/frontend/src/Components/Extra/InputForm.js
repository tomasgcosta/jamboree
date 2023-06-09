import React from "react";

export const InputForm = (props) => {
  return (
    <div className="relative mt-2 rounded-md shadow-sm flex max-w-[22rem]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ">
        <div className="flex gap-[10rem]">
          <span className="text-gray-500 sm:text-sm ">{props.icon}</span>
          <span
            onClick={props.onPasswordToggle}
            className="text-gray-500 sm:text-sm"
          >
            {props.icon2}
          </span>
        </div>
      </div>
      <input
        required={true}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        className=" font-sfdisplay-medium tracking-wider block w-full rounded-lg  h-[3.5rem] py-[1.8rem] pl-12 pr-3 text-gray-500 focus:ring-offset-2 focus:decoration-hidden focus:ring-inset-2 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:font-sfdisplay-thinitalic "
        placeholder={props.placeholder}
      />
    </div>
  );
};
