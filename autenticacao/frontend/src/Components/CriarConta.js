import React, { useState } from "react";
import { Btn } from "./Extra/Btn";
import { InputForm } from "./Extra/InputForm";
import { BtnEngano } from "./Extra/BtnEngano";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { TextField } from "@mui/material";
export const CriarConta = () => {
  const history = useHistory();
  const [state, setState] = useState({
    nome: "",
    email: "",
    imagem: "",
    password: "",
    passwordConf: "",
    datadenascimento: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    criarConta();
  };
  const handleChange = (value, field) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  async function criarConta() {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (res.status === 200) {
      console.log("NICE");
      const body = await res.json();
      localStorage.setItem("token", body.token);

      history.push("/geraleventos");
    } else {
      console.log("NOT NICE");
    }
  }

  return (
    <div className="h-[100vh] w-full bg-corPrincipal flex gap-3 flex-col">
      <div className="flex items-end ml-5 h-[15rem]">
        <h1 className="text-[#120D26] font-sfdisplay-bold text-[3rem] ">
          Criar Conta
        </h1>
      </div>
      <div className="flex flex-col justify-around ml-5">
        <form onSubmit={handleSubmit}>
          <InputForm
            value={state.nome}
            onChange={(e) => handleChange(e.target.value, "nome")}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.1667 30.625V27.7083C29.1667 26.1612 28.5521 24.6775 27.4582 23.5835C26.3642 22.4896 24.8805 21.875 23.3334 21.875H11.6667C10.1196 21.875 8.63588 22.4896 7.54192 23.5835C6.44796 24.6775 5.83337 26.1612 5.83337 27.7083V30.625"
                  stroke="#ADAFBB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5 16.0417C20.7216 16.0417 23.3333 13.43 23.3333 10.2083C23.3333 6.98667 20.7216 4.375 17.5 4.375C14.2783 4.375 11.6666 6.98667 11.6666 10.2083C11.6666 13.43 14.2783 16.0417 17.5 16.0417Z"
                  stroke="#ADAFBB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            type={"text"}
            name={"nome"}
            id={"nome"}
            placeholder={"Nome"}
          />
          <InputForm
            value={state.datadenascimento}
            onChange={(e) => handleChange(e.target.value, "datadenascimento")}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.20143 4.65808H13.8322V3.34705H8.20143V4.65808ZM6.92052 3.40089V3.40742C6.48097 3.44739 6.04614 3.53468 5.6231 3.66603V3.66114C5.61052 3.66643 5.59868 3.6705 5.58732 3.6744L5.58732 3.6744C5.5724 3.67953 5.55831 3.68438 5.54447 3.69132C5.51066 3.69948 5.47763 3.71172 5.44618 3.72722C5.35339 3.75741 5.26061 3.7933 5.17333 3.83001C5.15013 3.83899 5.12694 3.84939 5.10374 3.85979C5.08054 3.87019 5.05735 3.88059 5.03415 3.88957C5.00231 3.90466 4.96908 3.92118 4.93586 3.9377C4.90264 3.95422 4.86942 3.97074 4.83757 3.98584L4.68031 4.07639C4.65123 4.09122 4.62432 4.10861 4.59685 4.12636C4.5805 4.13693 4.56395 4.14762 4.54664 4.15798C4.30996 4.31054 4.09058 4.4892 3.89243 4.69234L3.88063 4.70458C3.85461 4.73492 3.82869 4.76436 3.80312 4.79339C3.75994 4.84244 3.71777 4.89034 3.67776 4.93954L3.66597 4.95096C3.02276 5.83858 2.70038 6.9326 2.7562 8.04131V8.39293H4.0261V8.03805C4.0261 6.49287 4.51833 5.53101 5.61366 5.03825C6.03198 4.86122 6.47389 4.7519 6.92366 4.71192H6.93546V3.4066L6.92052 3.40089ZM18.3315 4.93464L18.337 4.94606C18.9794 5.8345 19.3002 6.92934 19.2436 8.03805V8.39293H17.9745V8.02907C18.0012 7.37478 17.8699 6.72375 17.5916 6.13554C17.3242 5.63217 16.8965 5.24139 16.3799 5.02928C15.9686 4.85224 15.533 4.74211 15.0887 4.70295V3.40415C15.5283 3.44494 15.9631 3.53142 16.3869 3.66277V3.65624C16.4107 3.66705 16.4289 3.67347 16.4601 3.6845L16.4656 3.68643C16.48 3.69155 16.4935 3.69666 16.5069 3.70172C16.5255 3.70876 16.5437 3.71568 16.5638 3.72233C16.6508 3.75085 16.7321 3.78447 16.8157 3.81905L16.8304 3.82512C16.869 3.83868 16.9054 3.85549 16.9381 3.87064C16.9488 3.87555 16.959 3.88028 16.9688 3.88467C17.038 3.91486 17.1088 3.95076 17.1654 3.98094C17.2031 4.00053 17.2399 4.0215 17.2744 4.04116C17.2931 4.0518 17.311 4.06205 17.3281 4.0715C17.3563 4.08706 17.3808 4.1037 17.4044 4.11971C17.4216 4.1314 17.4383 4.14275 17.4555 4.15308C17.693 4.30646 17.9147 4.48594 18.1152 4.68745L18.1223 4.69969C18.1962 4.77393 18.2662 4.85224 18.3315 4.93464Z"
                  fill="#ADAFBB"
                  fillOpacity="1.0"
                />
                <path
                  d="M15.1252 2.49053V5.37944C15.1252 5.74343 14.8299 6.03825 14.4652 6.03825C14.1006 6.03825 13.8052 5.74343 13.8052 5.37944V2.49712C13.8019 2.13312 14.0956 1.83583 14.4603 1.83336C14.8249 1.83089 15.1227 2.12324 15.1252 2.48724V2.49053Z"
                  stroke="#ADAFBB"
                  strokeWidth="0.5"
                  fill="#ADAFBB"
                  fillOpacity="0.7"
                />
                <path
                  d="M8.195 2.501V5.38276C8.195 5.74834 7.89929 6.04475 7.53459 6.04475C7.16988 6.04475 6.875 5.74834 6.875 5.38276V2.501C6.875 2.13543 7.16988 1.83984 7.53459 1.83984C7.89929 1.83984 8.195 2.13543 8.195 2.501"
                  stroke="#ADAFBB"
                  strokeWidth="0.5"
                  fill="#ADAFBB"
                  fillOpacity="0.7"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.75 15.501V8.39293H19.25V15.501C19.25 18.6006 17.519 20.1667 14.0883 20.1667H7.90379C4.48104 20.1667 2.75 18.6006 2.75 15.501ZM6.47176 12.3446C6.47176 12.7746 6.8101 13.1235 7.22713 13.1235C7.65202 13.1235 7.99036 12.7665 7.98249 12.3364C7.98249 11.9064 7.64415 11.5575 7.23499 11.5575H7.22713C6.8101 11.5575 6.47176 11.9145 6.47176 12.3446ZM10.2407 12.3446C10.2407 12.7746 10.5869 13.1235 11.0039 13.1235C11.421 13.1235 11.7593 12.7746 11.7593 12.3364C11.7593 11.9145 11.421 11.5656 11.0039 11.5575H10.9961C10.5791 11.5656 10.2407 11.9145 10.2407 12.3446ZM14.7729 13.1235C14.3559 13.1235 14.0175 12.7746 14.0175 12.3446C14.0175 11.9145 14.348 11.5656 14.7729 11.5656C15.1899 11.5656 15.5283 11.9145 15.5283 12.3446C15.5283 12.7746 15.1899 13.1235 14.7729 13.1235ZM14.7729 16.4503C14.3559 16.4503 14.0175 16.1014 14.0097 15.6714C14.0097 15.2413 14.348 14.8924 14.765 14.8924H14.7729C15.1899 14.8924 15.5283 15.2413 15.5283 15.6714C15.5283 16.1014 15.1899 16.4503 14.7729 16.4503ZM11.0039 16.4504C10.5869 16.4504 10.2407 16.1014 10.2407 15.6714C10.2407 15.2413 10.5791 14.8924 10.9961 14.8843H11.0039C11.421 14.8924 11.7514 15.2413 11.7593 15.6633C11.7593 16.1014 11.421 16.4504 11.0039 16.4504ZM7.22711 16.4504C6.81009 16.4504 6.47175 16.1014 6.47175 15.6714C6.46388 15.2413 6.80222 14.8843 7.22711 14.8843C7.64414 14.8843 7.98248 15.2332 7.98248 15.6633C7.98248 16.0933 7.64414 16.4504 7.22711 16.4504Z"
                  fill="#ADAFBB"
                  fillOpacity="0.7"
                />
              </svg>
            }
            type={"date"}
            name={"datadenascimento"}
            id={"datadenascimento"}
            placeholder={"data nascimento"}
          />
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
            placeholder={"Email"}
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
            placeholder={"Password"}
          />
          <InputForm
            value={state.passwordConf}
            onChange={(e) => handleChange(e.target.value, "passwordConf")}
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
            name={"confpassword"}
            id={"confpassword"}
            placeholder={"Confirmar password"}
          />
          <div className="flex justify-center font-sfdisplay-bold">
            <Btn name={"CRIAR CONTA"} />
          </div>
          <Link to="/entrar">
            <div className="flex justify-center">
              <BtnEngano name={"Já tens conta?"} />
            </div>
          </Link>
        </form>
      </div>
      <div className="flex items-end mx-auto text-center h-[4rem]  text-white text-sm">
        <h1 className="font-sfdisplay-medium">
          Ao continuar, aceitas os{" "}
          <span className="text-termosUso font-">Termos de Uso</span> e{" "}
          <span className="text-termosUso font-">
            Serviço e Política de privacidade
          </span>
        </h1>
      </div>
    </div>
  );
};
