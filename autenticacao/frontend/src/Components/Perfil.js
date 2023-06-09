import React, { useEffect, useState } from "react";
import { Btn } from "./Extra/Btn";
import { InputForm } from "./Extra/InputForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { NavBar } from "./Extra/NavBar";
import { BtnCancelar } from "./Extra/BtnCancelar";

export const Perfil = () => {
  const history = useHistory();
  //Atualizar quando
  const [userName, setUserName] = useState("");
  const [editing, setEditing] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [state, setState] = useState({
    nome: "",
    email: "",
    imagem: "",
    password: "",
  });

  const [typeText, setTypeText] = useState("password");

  const handleSair = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    edit();
  };

  const handleChange = (value, field, editing) => {
    if (!editing) return;
    setState((s) => ({ ...s, [field]: value }));
  };

  async function edit() {
    const res = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: {
        authorization: localStorage.getItem("token") || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (res.status === 200) {
      history.push("/perfil");
    } else {
    }
  }

  const handleParceiro = () => {
    history.push("/serparceiro");
  };

  async function getUser() {
    const res = await fetch(`/api/users/profile`, {
      headers: {
        authorization: localStorage.getItem("token") ?? "",
      },
    });
    if (res.status === 200) {
      const body = await res.json();
      setState(body);
      //body.imagem
      setUserImg(body.imagem);
      setUserName(body.nome);
    } else {
      history.push("/");
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleApagarConta() {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token") ?? "",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      localStorage.removeItem("token");
      history.push("/");
    } else {
    }
  }

  const handlePassword = () => {
    setTypeText((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  return (
    <div className="h-[100vh] w-full bg-corPrincipal flex flex-col">
      <div className="h-[16rem] flex flex-col justify-center items-center w-full">
        <img src={userImg} className="rounded-full w-[4rem] h-[4rem]" />
        <h1 className="text-[1.5rem] text-white capitalize font-sfdisplay-semibold ">
          {userName && userName}
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full px-8 gap-2">
          <InputForm
            value={state.nome}
            onChange={(e) => handleChange(e.target.value, "nome", editing)}
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.1667 30.625V27.7083C29.1667 26.1612 28.5521 24.6775 27.4582 23.5835C26.3642 22.4896 24.8805 21.875 23.3334 21.875H11.6667C10.1196 21.875 8.63588 22.4896 7.54192 23.5835C6.44796 24.6775 5.83337 26.1612 5.83337 27.7083V30.625"
                  stroke="#ADAFBB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 16.0417C20.7216 16.0417 23.3333 13.43 23.3333 10.2083C23.3333 6.98667 20.7216 4.375 17.5 4.375C14.2783 4.375 11.6666 6.98667 11.6666 10.2083C11.6666 13.43 14.2783 16.0417 17.5 16.0417Z"
                  stroke="#ADAFBB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            type={"text"}
            name={"nome"}
            id={"nome"}
          />
          <InputForm
            value={state.email}
            onChange={(e) => handleChange(e.target.value, "email", editing)}
            icon={
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9952 6.09771L14.0852 9.24579C13.3453 9.82592 12.308 9.82592 11.5681 9.24579L7.62451 6.09771"
                  stroke="#ADAFBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.48055 1H17.1228C18.3689 1.01398 19.5549 1.54077 20.4047 2.45769C21.2544 3.3746 21.6937 4.60161 21.6201 5.85294V11.8368C21.6937 13.0882 21.2544 14.3152 20.4047 15.2321C19.5549 16.149 18.3689 16.6758 17.1228 16.6898H8.48055C5.80397 16.6898 4 14.5123 4 11.8368V5.85294C4 3.17749 5.80397 1 8.48055 1Z"
                  stroke="#ADAFBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            type={"text"}
            name={"email"}
            id={"email"}
            placeholder={"abc@email.com"}
          />

          <InputForm
            value={state.imagem}
            onChange={(e) => handleChange(e.target.value, "imagem", editing)}
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M24.1921 18.0031L20.4848 9.33296C19.8096 7.74581 18.8029 6.84564 17.6539 6.78642C16.5169 6.7272 15.4154 7.52077 14.5744 9.03685L12.324 13.0758C11.8502 13.9286 11.1751 14.4379 10.4407 14.4971C9.69455 14.5682 8.94835 14.1773 8.34429 13.4075L8.08371 13.0758C7.24276 12.0217 6.20045 11.5124 5.13446 11.619C4.06846 11.7256 3.15644 12.4599 2.55238 13.6562L0.503295 17.7425C-0.231057 19.2231 -0.159991 20.9405 0.70465 22.3381C1.56929 23.7358 3.07353 24.5767 4.7199 24.5767H19.8333C21.4205 24.5767 22.901 23.7832 23.7775 22.4566C24.6777 21.13 24.8198 19.4599 24.1921 18.0031Z"
                  fill="#ADAFBB"
                />
                <path
                  d="M6.36528 8.0068C8.57631 8.0068 10.3686 6.21441 10.3686 4.00339C10.3686 1.79236 8.57631 -1.71661e-05 6.36528 -1.71661e-05C4.15427 -1.71661e-05 2.36188 1.79236 2.36188 4.00339C2.36188 6.21441 4.15427 8.0068 6.36528 8.0068Z"
                  fill="#ADAFBB"
                />
              </svg>
            }
            type={"text"}
            name={"imagem"}
            id={"imagem"}
            placeholder={"A tua melhor foto"}
          />
          {/*FORM_ICON_LOCK*/}
          <InputForm
            value={state.password}
            onChange={(e) => handleChange(e.target.value, "password", editing)}
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0548 8.66048V6.6924C15.0548 4.38881 13.1866 2.52065 10.883 2.52065C8.57943 2.51056 6.70393 4.36956 6.69385 6.67406V6.6924V8.66048"
                  stroke="#ADAFBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.3762 19.4788H7.372C5.4525 19.4788 3.896 17.9232 3.896 16.0028V12.0712C3.896 10.1508 5.4525 8.59521 7.372 8.59521H14.3762C16.2957 8.59521 17.8522 10.1508 17.8522 12.0712V16.0028C17.8522 17.9232 16.2957 19.4788 14.3762 19.4788Z"
                  stroke="#ADAFBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8743 13.0191V15.0551"
                  stroke="#ADAFBB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            onPasswordToggle={handlePassword}
            type={typeText}
            name={"password"}
            id={"password"}
            placeholder={"password"}
          />
        </div>
        {state && !state.parceiro && (
          <div
            className="w-full mt-3 flex justify-center"
            onClick={handleParceiro}
          >
            <span className="font-sfdisplay-semibold  text-[1rem] border-b-2 border-black">
              Ser parceiro
            </span>
          </div>
        )}

        <div className="flex justify-center">
          {editing ? (
            <Btn name={"GUARDAR"} onClick={() => setEditing(false)} />
          ) : (
            <Btn name={"EDITAR"} onClick={() => setEditing(true)} />
          )}
        </div>
      </form>
      <div className="flex justify-center" onClick={handleSair}>
        <BtnCancelar name={"SAIR"} />
      </div>
      <div className="w-full mt-3 flex justify-center">
        <span
          onClick={handleApagarConta}
          className="font-sfdisplay-semibold text-[1rem] border-b-2 border-black"
        >
          Apagar Conta
        </span>
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
