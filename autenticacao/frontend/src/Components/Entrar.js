import React, { useEffect, useState } from "react";
import { Btn } from "./Extra/Btn";
import { InputForm } from "./Extra/InputForm";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { BtnEngano } from "./Extra/BtnEngano";
import { ToastContainer, toast } from "react-toastify";

export const Entrar = () => {
  const [state, setState] = useState({ password: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const history = useHistory();

  useEffect(() => {
    setInterval(() => {
      setLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  const handleChange = (value, field) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (res.status === 200) {
      const corpo = await res.json();
      localStorage.setItem("token", corpo.token);
      history.push("/geraleventos");
    } else {
      toast.error("Cria conta para entrar!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <div className="h-[100vh] overflow-hidden w-full bg-corPrincipal flex flex-col gap-3 ">
      <div className="flex items-end ml-[2rem] h-[18rem] w-full">
        <h1 className="text-[#120D26] font-sfdisplay-bold text-[3rem] ">Entrar</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 px-8">
          <InputForm
            value={state.email}
            onChange={(e) => handleChange(e.target.value, "email")}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 23 18"
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
            value={state.password}
            onChange={(e) => handleChange(e.target.value, "password")}
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
            type={"password"}
            name={"password"}
            id={"password"}
            placeholder={"password"}
          />

          <div class="flex items-start w-full">
            <input
              type="checkbox"
              id="hs-small-switch"
              class="relative shrink-0 w-11 h-6 bg-gray-100 checked:bg-none checked:bg-blue-600 rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800

  before:inline-block before:w-5 before:h-5 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
            />
            <label
              for="hs-small-switch"
              class="font-sfdisplay-medium text-sm text-[#5259FD] ml-3 dark:text-[#5259FD] tracking-wide"
            >
              Guardar sessão
            </label>
          </div>

          <div className="flex justify-center">
            <Btn name={"Entrar"} />
          </div>
          <Link to="/criarconta">
            <div className="flex  justify-center">
              <BtnEngano name={"Sem conta? Regista-te!"} />
            </div>
          </Link>
        </div>
      </form>
      <ToastContainer
        position="center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex items-end h-[9rem] text-white text-sm">
        <h1 className="font-sfdisplay-medium text-center">
          Ao continuar, aceitas os{" "}
          <span className="text-termosUso font-sfpro">Termos de Uso</span> e{" "}
          <span className="text-termosUso font-sfpro">
            Serviço e Política de privacidade
          </span>
        </h1>
      </div>
    </div>
  );
};
