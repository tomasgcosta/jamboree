import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import "@splidejs/react-splide/css";

import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

import "@splidejs/react-splide/css/core";
import { NavBar } from "./Extra/NavBar";
import { Evento } from "./Extra/Evento";

import { Carteira } from "../assets/Carteira.js";
import { CoracaoCheio } from "../assets/CoracaoCheio";
import { CoracaoVazio } from "../assets/CoracaoVazio";

export const GeralEventos = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [espetaculos, setEspetaculos] = useState([]);
  const [festas, setFestas] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const [fav, setFav] = useState([]);

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    const body = await res.json();
    setUser(body);
    setUserName(body.nome);
  }

  async function getEventsEspetaculos() {
    const res = await fetch(`/api/events/espetaculos`);
    const data = await res.json();
    setEspetaculos(data);
  }

  async function getEventsFestas() {
    const res = await fetch(`/api/events/festas`);
    const data = await res.json();
    setFestas(data);
  }

  async function getEventsExperiencias() {
    const res = await fetch(`/api/events/experiencias`);
    const data = await res.json();
    setExperiencias(data);
  }

  useEffect(() => {
    getEventsEspetaculos();
    getEventsFestas();
    getEventsExperiencias();
    // getFavoriteEvents();
    getFavoritesEvents();

    getUser();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
  }, []);

  const handleEventClick = (id) => {
    const path = `/events/event/${id}`;
    history.push(path, id);
  };

  const handleCarteira = () => {
    history.push("/carteiraroute");
  };

  async function getFavoritesEvents() {
    const res = await fetch("/api/users/favorites", {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setFav(data.map((ele) => ele.eventId));
    console.log(fav);
  }

  async function handleFavClick(id) {
    const res = await fetch(`/api/users/favorite`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventId: id }),
    });

    console.log("ENTROU");

    setFav((f) => {
      if (f.includes(id)) {
        return f.filter((e) => e !== id);
      } else {
        return [...f, id];
      }
    });
  }

  return (
    <div className={`h-screen bg-corPrincipal flex flex-col items-center `}>
      <div className="text-[2.5rem] h-[5rem] flex w-full items-center justify-around">
        {userName && (
          <h1 className="text-[#E3DEDE] capitalize">Olá {userName}!</h1>
        )}
        {!userName && <h1 className="text-[#E3DEDE]">Bem-vindo</h1>}

        {loggedIn && user && (
          <div onClick={() => handleCarteira()}>
            {loggedIn && !user.parceiro && <Carteira fill="transparent" />}
          </div>
        )}
      </div>

      <div>
        {espetaculos.length > 0 ? (
          <div class="carro" className="w-full relative">
            <Splide
              // alinhar ao titulo dos eventos
              options={{
                type: "loop",
                perPage: 2,
                drag: "free",
                snap: true,
                pagination: false,
                gap: "1rem",
                arrows: false,
              }}
            >
              {espetaculos?.map((ele, i) => (
                <SplideSlide key={i}>
                  <div>
                    <Evento
                      onClick={() => handleEventClick(ele["_id"])}
                      src={ele.image}
                      title={ele.title}
                      location={ele.location}
                    />
                  </div>
                  {/* //RAFA FAVORITOS */}
                  {loggedIn && user && !user.parceiro && (
                    <div
                      onClick={() => handleFavClick(ele["_id"])}
                      className="absolute flex justify-center items-center bottom-0 rounded-full right-0 w-[2rem] h-[2rem]"
                    >
                      {fav.includes(ele._id) ? (
                        <CoracaoCheio />
                      ) : (
                        <CoracaoVazio />
                      )}
                    </div>
                  )}
                </SplideSlide>
              ))}
            </Splide>
            <h1 className="font-sfdisplay-semibold absolute text-[1.52rem] capitalize top-0 ml-[3rem] text-[#E3DEDE]">
              Espetáculos
            </h1>
          </div>
        ) : (
          <Splide>
            <SplideSlide>
              <div className="flex justify-center items-center gap-3">
                <h1>Não há eventos</h1>
              </div>
            </SplideSlide>
          </Splide>
        )}
      </div>

      <div>
        {festas.length > 0 ? (
          <div className="p-w-full relative">
            <Splide
              options={{
                type: "loop",
                perPage: 2,
                drag: "free",
                snap: true,
                pagination: false,
                gap: "1rem",
                arrows: false,
              }}
            >
              {festas?.map((ele, i) => (
                <SplideSlide key={i}>
                  <Evento
                    onClick={() => handleEventClick(ele["_id"])}
                    src={ele.image}
                    title={ele.title}
                    location={ele.location}
                  />
                  {/* //RAFA FAVORITOS */}
                  {loggedIn && user && !user.parceiro && (
                    <div
                      onClick={() => handleFavClick(ele["_id"])}
                      className="absolute flex justify-center items-center bottom-0 rounded-full right-0  w-[2rem] h-[2rem]"
                    >
                      {fav.includes(ele._id) ? (
                        <CoracaoCheio />
                      ) : (
                        <CoracaoVazio />
                      )}
                    </div>
                  )}
                </SplideSlide>
              ))}
            </Splide>
            <h1 className="font-sfdisplay-semibold text-[1.52rem] absolute top-0 ml-[3rem] capitalize text-[#E3DEDE]">
              Festas
            </h1>
          </div>
        ) : (
          <Splide>
            <SplideSlide>
              <div className="flex justify-center items-center gap-3">
                <h1>Não há eventos</h1>
              </div>
            </SplideSlide>
          </Splide>
        )}
      </div>
      <div>
        {experiencias.length > 0 ? (
          <div className="w-full relative">
            <Splide
              style={{ padding: "1rem" }} // alinhar ao titulo dos eventos
              aria-label="My Favorite Images"
              options={{
                type: "loop",
                perPage: 2,
                drag: "free",
                snap: true,
                pagination: false,
                gap: "1rem",
                arrows: false,
              }}
            >
              {experiencias?.map((ele, i) => (
                <SplideSlide key={i}>
                  <Evento
                    onClick={() => handleEventClick(ele["_id"])}
                    src={ele.image}
                    title={ele.title}
                    location={ele.location}
                  />
                  {/* //RAFA FAVORITOS */}
                  {loggedIn && user && !user.parceiro && (
                    <div
                      onClick={() => handleFavClick(ele["_id"])}
                      className="absolute flex justify-center items-center bottom-0 rounded-full right-0  w-[2rem] h-[2rem]"
                    >
                      {fav.includes(ele._id) ? (
                        <CoracaoCheio />
                      ) : (
                        <CoracaoVazio />
                      )}
                    </div>
                  )}
                </SplideSlide>
              ))}
            </Splide>
            <h1 className="font-sfdisplay-semibold absolute text-[1.52rem] capitalize top-0 ml-[3rem] text-[#E3DEDE]">
              Experiências
            </h1>
          </div>
        ) : (
          <Splide>
            <SplideSlide>
              <div className="font-sfdisplay-semibold flex justify-center items-center gap-3">
                <h1>Não há eventos</h1>
              </div>
            </SplideSlide>
          </Splide>
        )}
      </div>

      <div className="w-full absolute bottom-0 ">
        {loggedIn ? (
          <NavBar />
        ) : (
          <Link to="/escolha">
            <div className="flex justify-center p-3">
              <h1 className="w-[10rem]  font-sfdisplay-medium border-b-2 border-black">
                Torna-te um Jamboree
              </h1>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
