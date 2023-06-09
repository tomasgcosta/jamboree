import React, { useEffect, useState } from "react";
import { NavBarHome } from "../../assets/NavBarHome.js";
import { NavBarFav } from "../../assets/NavBarFav.js";
import { Mais } from "../../assets/Mais.js";
import { NavBarBilhete } from "../../assets/NavBarBilhete.js";
import { NavBarPerfil } from "../../assets/NavBarPerfil.js";
import { useHistory, useLocation } from "react-router-dom";
import { NavBarPerfil2 } from "../../assets/NavBarPerfil2.js";
import { NavBarHome2 } from "../../assets/NavBarHome2.js";
import { NavBarFav2 } from "../../assets/NavBarFav2.js";
import { Mais2 } from "../../assets/Mais2.js";
import { NavBarBilhete2 } from "../../assets/NavBarBilhete2.js";

export const NavBar = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, setState] = useState();
  const [colorClick, setcolorClick] = useState("");

  useEffect(() => {
    getUser();
    setcolorClick(location.pathname);
  }, [location.pathname]);

  const handleClick = (caminho) => {
    history.push(caminho);
  };

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
    <div className="flex justify-between bg-[#2C373F] items-center h-[5rem] w-full text-white px-3">
      <div
        className={`flex flex-col items-center justify-center  min-h-[1rem] min-w-[4.3rem] `}
        onClick={() => handleClick("/geraleventos")}
      >
        {colorClick === "/geraleventos" ? <NavBarHome2 /> : <NavBarHome />}

        <p
          className={
            colorClick === "/geraleventos"
              ? "w-[3.2rem] text-sm font-sfdisplay-semibold text-white"
              : "w-[rem] font-sfdisplay-ultrathin text-sm  text-[#ADAFBB]"
          }
        >
          PARA TI
        </p>
      </div>
      <div className=" w-[4.3rem]">
        {state && !state.parceiro && (
          <div
            className={`flex flex-col items-center justify-center `}
            onClick={() => handleClick("/favoritos")}
          >
            {colorClick === "/favoritos" ? <NavBarFav2 /> : <NavBarFav />}
            <p
              className={
                colorClick === "/favoritos"
                  ? "font-sfdisplay-semibold text-sm text-white"
                  : "font-sfdisplay-ultrathin text-sm text-[#ADAFBB]"
              }
            >
              FAVORITOS
            </p>
          </div>
        )}
        {state && state.parceiro && (
          <div
            className={`flex flex-col items-center  min-h-[3.2rem]  min-w-[10.5rem] `}
            onClick={() => handleClick("/criarevento")}
          >
            {colorClick === "/criarevento" ? <Mais2 /> : <Mais />}

            <p
              className={
                colorClick === "/criarevento"
                  ? "font-sfdisplay-semibold text-sm text-white"
                  : "font-sfdisplay-ultrathin text-sm text-[#ADAFBB]"
              }
            >
              CRIAR EVENTO
            </p>
          </div>
        )}
      </div>
      <div className=" min-w-[4.3rem]">
        {state && !state.parceiro && (
          <div
            className={`flex flex-col items-center justify-center  min-w-[4.3rem]`}
            onClick={() => handleClick("/bilhetes")}
          >
            {colorClick === "/bilhetes" ? (
              <NavBarBilhete2 />
            ) : (
              <NavBarBilhete />
            )}

            <p
              className={
                colorClick === "/bilhetes"
                  ? "font-sfdisplay-semibold text-sm text-white"
                  : "font-sfdisplay-ultrathin text-sm text-[#ADAFBB]"
              }
            >
              BILHETES
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col items-center justify-center  min-h-[1rem] min-w-[3.4rem] `}
        onClick={() => handleClick("/perfil")}
      >
        {colorClick === "/perfil" ? <NavBarPerfil2 /> : <NavBarPerfil />}
        <p
          className={
            colorClick === "/perfil"
              ? "font-sfdisplay-semibold text-sm text-white"
              : "font-sfdisplay-ultrathin text-sm text-[#ADAFBB]"
          }
        >
          PERFIL
        </p>
      </div>
    </div>
  );
};
