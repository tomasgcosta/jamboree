import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Jamboree } from "../assets/Jamboree";

/* bg-gradient-to-b from-corPrincipal to-corSecundaria */

export const Home = () => {
  return (
    <div
      className={`h-[100vh] bg-gradient-to-b from-corPrincipal to-corSecundaria w-full flex flex-col items-center justify-around`}
    >
      <img
        src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        className="opacity-20 h-[100vh] bg-cover bg-center object-cover absolute mix-blend-overlay z-0"
      />
      <h1 className="h-[50px] pt-[6rem] pl-11">
        <Jamboree />
        <p className="pl-1 font-sfdisplay tracking-wide text-sm lowercase pt-[0.4rem] text-[#E3DEDE] pr-12">
          Encontre as melhores experiências perto de si
        </p>
      </h1>
      <div className="flex flex-col gap-5 text-whiteLogs">
        <Link to="/criarconta">
          <div className="z-20 cursor-pointer border-solid border-2 border-[#ADAFBB] rounded-lg p-3 bg-transparent flex justify-center items-center w-[10rem]">
            <button className="text-[#E3DEDE] font-sfdisplay-medium uppercase cl z-30">
              Criar Conta
            </button>
          </div>
        </Link>
        <Link to="/entrar">
          <div className="  z-30 cursor-pointer border-solid border-2 border-[#ADAFBB] rounded-lg p-3 bg-transparent flex justify-center items-center w-[10rem]  active:border-4">
            <button className="text-[#E3DEDE] font-sfdisplay uppercase z-40 ">
              Entrar
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
