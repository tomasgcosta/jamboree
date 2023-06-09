import React from "react";

export const BtnCancelar = (props) => {
  return (
    <div className="font-semibold my-3 cursor-pointer rounded-lg p-3 bg-cancelar text-white flex justify-center items-center w-[15rem]">
      {props.name}
    </div>
  );
};
