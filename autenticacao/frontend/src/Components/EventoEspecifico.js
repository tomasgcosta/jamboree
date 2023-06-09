import React, { useEffect, useState } from "react";
import { Btn } from "./Extra/Btn";
import { NavBar } from "./Extra/NavBar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Link, useHistory, useParams } from "react-router-dom";
import { Calendario } from "../assets/Calendario";
import { Localizacao } from "../assets/Localizacao";
import { Euro } from "../assets/Euro";

export const EventoEspecifico = () => {
  const [state, setState] = useState([]);
  const [numero, setNumero] = useState(1);
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [user, setUser] = useState();
  const history = useHistory();

  const { id } = useParams();

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      setUser(body);
    } else {
    }
  }

  async function getEvent() {
    const res = await fetch(`/api/events/event/${id}`);
    const ev = await res.json();
    setState(ev);
  }

  useEffect(() => {
    setValue(0.5 + Math.floor(Math.random() * 5));
    getEvent();
    getUser();
  }, []);

  const [value, setValue] = useState(3.5);
  const [hover, setHover] = useState(-1);

  const labels = {
    0.5: "Péssimo",
    1: "Péssimo+",
    1.5: "Muito Mau",
    2: "Muito Mau+",
    2.5: "Normal",
    3: "Normal+",
    3.5: "Bom",
    4: "Bom+",
    4.5: "Muito bom",
    5: "Excelente",
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  async function buyTicket() {
    const res = await fetch(`/api/tickets/${id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: { numero } }),
    });

    if (res.status === 201) {
    } else {
      history.push("/escolha");
    }
  }

  return (
    <div
      className={`h-screen relative overflow-x-hidden bg-corPrincipal flex flex-col items-center gap-3 text-escritaNormal`}
    >
      {state && (
        <div>
          <div className="relative pt-10 text-white">
            <img
              className="rounded-[9%] p-3 min-w-[25rem] max-w-[25rem] h-[15rem]"
              src={state.image}
            />
            <div className="absolute bottom-0 left-0 pl-5 pb-5">
              <p className="text-[2rem] ">{state.title}</p>
              <p className="text-[#a3a3a3]">{state.location}</p>
              <div className="">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                  />
                  {value !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : value]}
                    </Box>
                  )}
                </Box>
              </div>
            </div>
          </div>
          <div className=" w-full ml-3 h-[15%] overflow-y-auto">
            <p>{state.description}</p>
          </div>
          <div className=" w-full flex flex-col p-3 gap-3">
            <div className="flex gap-3 w-full h-[2rem] items-center">
              <p>
                <Calendario />
              </p>
              <p>
                {state.date} | {state.hour} | {state.duration}
              </p>
            </div>
            <div className="flex gap-3 w-full h-[2rem] items-center">
              <p>
                <Localizacao />
              </p>
              <p>{state.location}</p>
            </div>
            <div className="flex gap-3 w-full h-[2rem] items-center">
              <p>
                <Euro />
              </p>
              <p>{state.price}</p>
            </div>
          </div>
          <div className=" w-full flex flex-col items-start p-3">
            <h3 className="text-[1.5rem] text-escritaNormal">
              Número de Bilhetes:
            </h3>
          </div>
          <div className="flex gap-[5rem] p-5 text-white text-[4rem] justify-center items-center h-[6rem]">
            <button
              disabled={numero > 0 ? false : true}
              onClick={() => setNumero((prv) => prv - 1)}
            >
              -
            </button>
            <h1>{numero}</h1>
            <button onClick={() => setNumero((prv) => prv + 1)}>+</button>
          </div>
          <div className="flex justify-center">
            <Btn
              type="button"
              name={`PAGAR: ${state.price * numero} €`}
              onClick={buyTicket}
            />
          </div>

          {loggedIn ? (
            <div className="w-full absolute bottom-0">
              <NavBar />
            </div>
          ) : (
            <Link to="/escolha">
              <div className="flex justify-center p-3">
                <h1 className="text-black w-[11rem] font-sfdisplay-semibold  border-b-2 border-black">
                  Torna-te um Jamboree
                </h1>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
