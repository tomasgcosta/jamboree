import React, { useEffect, useState } from "react";
import { NavBar } from "./Extra/NavBar";
import { BtnCancelar } from "./Extra/BtnCancelar";
import { useHistory } from "react-router-dom";

export const Bilhetes = () => {
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [bilhetes, setBilhetes] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [eventId, setEventId] = useState([]);

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
      console.log("NOT NICE");
    }
  }

  async function getBilhetes() {
    const res = await fetch("/api/users/history", {
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
    });
    const userTickets = await res.json();
    setBilhetes(userTickets?.map((ele) => ele.eventId));
    setEventId(userTickets?.map((ele) => ele["_id"]));
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

  async function handleApagarBilhete(id) {
    console.log(eventId);
    console.log("TOMAS");

    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      console.log("NICEEEEEEEEE");
      console.log("Funcionou");
      history.push("/bilhetes");
    } else {
      console.log("NOT NICEEEEEEE");
    }
  }

  useEffect(() => {
    getUser();
    getBilhetes();
    getEvent();
  }, [bilhetes]);

  return (
    <div
      className={`h-[85vh] overflow-hidden bg-corPrincipal flex flex-col items-center`}
    >
      <div className="h-[16rem] flex flex-col justify-center items-center w-full">
        <img src={userImg} className="rounded-full w-[6rem] h-[6rem]" />
        <h1 className="text-[1.5rem] text-white capitalize font-sfdisplay-semibold ">
          {userName && userName}
        </h1>
      </div>
      <p className="text-[2rem] ">{userEvents && userEvents.description}</p>
      <div className="flex flex-col gap-3 overflow-y-auto mb-3">
        {bilhetes.length > 0 ? (
          userEvents?.map((ele, i) => {
            return (
              <div key={i} className="flex flex-col">
                <div className="relative ">
                  <img
                    src={ele.image}
                    className="flex w-[22rem] min-h-[11rem] max-h-[11rem] opacity-60 rounded-lg border-[3px] border-[#4D5E6B] justify-center items-center"
                  />
                  <div className="absolute capitalize bottom-0 pl-3 pb-1 text-[#E3DEDE]">
                    <p className="font-sfdisplay-semibold text-[1.4rem] capitalize">
                      {ele.title}
                    </p>
                    <p className="font-sfdisplay text-sm pb-1 text-[#a3a3a3] capitalize">
                      Região do {ele.location}
                    </p>
                  </div>
                </div>
                <div
                  className="flex justify-center"
                  onClick={() => handleApagarBilhete(eventId[i])}
                >
                  <BtnCancelar name={"Cancelar"} />
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-[2rem] text-gray-500 font-sfdisplay-semibold ">
            Ainda sem bilhetes...
          </h1>
        )}
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
