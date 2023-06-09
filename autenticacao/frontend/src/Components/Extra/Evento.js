import React, { useState } from "react";
import { CoracaoVazio } from "../../assets/CoracaoVazio";
import { CoracaoCheio } from "../../assets/CoracaoCheio";

export const Evento = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [state, setState] = useState();

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    const body = await res.json();
    setState(body);
  }
  return (
    <div className="relative ">
      <img
        onClick={props.onClick}
        src={props.src}
        alt={props.alt}
        className=" w-[10rem] h-[9.063rem] rounded-lg opacity-60 border-[3px] border-[#4D5E6B]"
      />
      <div className="absolute bottom-0 left-1 p-1 flex flex-col text-[#E3DEDE] capitalize  text-md">
        <p className="font-sfdisplay-semibold">{props.title}</p>
        <p className="font-sfdisplay-thin text-sm opacity-70">
          {props.location}
        </p>
      </div>
    </div>
  );
};

{
  /* <CoracaoCheio /> */
}
