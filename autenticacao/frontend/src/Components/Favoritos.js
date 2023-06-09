import React, { useEffect, useState } from "react";
import { NavBar } from "./Extra/NavBar";
import { useHistory } from "react-router-dom";

export const Favoritos = () => {
  const [bilhetes, setBilhetes] = useState([]);
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const history = useHistory();

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      setUserImg(body.imagem);
      setUserName(body.nome);
    } else {
      history.push("/");
    }
  }

  async function getBilhetes() {
    const res = await fetch("/api/users/favorites", {
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
    });
    const userTickets = await res.json();

    setBilhetes(userTickets?.map((ele) => ele.eventId));
  }

  async function getEvent() {
    if (bilhetes.length > 0) {
      const eventPromises = bilhetes.map(async (eventId) => {
        const res = await fetch(`/api/events/event/${eventId}`);
        return res.json();
      });
      const events = await Promise.all(eventPromises);
      setUserEvents(events);
    }
  }

  useEffect(() => {
    getUser();
    getBilhetes();
    getEvent();
  }, [bilhetes]);

  return (
    <div className={` h-screen bg-corPrincipal flex flex-col items-center `}>
      <div className="min-h-[16rem] flex flex-col justify-center items-center w-full">
        <img src={userImg} className="rounded-full w-[4rem] h-[4rem]" />
        <h1 className="text-[1.5rem] text-white capitalize font-sfdisplay-semibold ">
          {userName && userName}
        </h1>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto mb-3">
        {bilhetes.length > 0 ? (
          userEvents.map((ele, i) => {
            return (
              <div className="relative" key={i}>
                <img
                  src={ele.image}
                  className="min-w-[22rem] max-w-[22rem] min-h-[11rem] max-h-[11rem] border-[3px] border-[#4D5E6B] drop-shadow-lg opacity-60 rounded-lg"
                />
                <div className="absolute bottom-0 pl-3 pb-1 text-white">
                  <p className="font-sfdisplay-semibold text-[1.4rem]">
                    {ele.title}
                  </p>
                  <p className="font-sfdisplay text-sm text-[#a3a3a3]">
                    Região do {ele.location}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" h-[13rem] flex items-center">
            <h1 className="text-[2rem] text-gray-500 font-sfdisplay-semibold ">
              Ainda sem favoritos...
            </h1>
          </div>
        )}
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
