import React, { useEffect, useState } from "react";
import { InputForm } from "./Extra/InputForm";
import { Btn } from "./Extra/Btn";
import { useHistory } from "react-router-dom";
import { BtnCancelar } from "./Extra/BtnCancelar";
import { NavBar } from "./Extra/NavBar";

export const CriarEvento = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    setInterval(() => {
      setLoggedIn(Boolean(localStorage.getItem("token")));
    }, 1000);
  }, []);

  const [state, setState] = useState({
    title: "",
    description: "",
    date: "",
    hour: "",
    location: "",
    image: "",
    duration: "",
    price: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarEvento();
  };

  async function enviarEvento() {
    const res = await fetch(`/api/events/${state.category}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (res.status === 201) {
      history.push("geraleventos");
    } else {
      history.push("geraleventos");
    }
  }

  const handleChange = (value, field) => {
    setState((s) => ({ ...s, [field]: value }));
  };

  const handleCancelar = () => {
    history.push("geraleventos");
  };

  return (
    <div
      className={`h-[100vh] relative overflow-x-hidden bg-corPrincipal flex flex-col items-center justify-center`}
    >
      <form onSubmit={handleSubmit}>
        <InputForm
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          icon={<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5.87776H20.511" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.90234 13.6822H6.85345" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.29199 13.6822H13.1942" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.33145 1H16.1698C19.6428 1 20.511 1.85849 20.511 5.28267V13.292C20.511 16.7162 19.6428 17.5746 16.1796 17.5746H5.33145C1.86824 17.5844 1 16.7259 1 13.3017V5.28267C1 1.85849 1.86824 1 5.33145 1Z" stroke="#ADAFBB" strokeWidth="1.46333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          }
          type={"text"}
          name={"title"}
          id={"title"}
          placeholder={"titulo"}
        />
        <InputForm
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          icon={<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5.87776H20.511" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.90234 13.6822H6.85345" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.29199 13.6822H13.1942" stroke="#ADAFBB" strokeWidth="1.46333" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.33145 1H16.1698C19.6428 1 20.511 1.85849 20.511 5.28267V13.292C20.511 16.7162 19.6428 17.5746 16.1796 17.5746H5.33145C1.86824 17.5844 1 16.7259 1 13.3017V5.28267C1 1.85849 1.86824 1 5.33145 1Z" stroke="#ADAFBB" strokeWidth="1.46333" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          }
          type={"text"}
          name={"description"}
          id={"description"}
          placeholder={"descrição"}
        />
        <InputForm
          value={state.date}
          onChange={(e) => handleChange(e.target.value, "date")}
          icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M8.20143 4.65808H13.8322V3.34705H8.20143V4.65808ZM6.92052 3.40089V3.40742C6.48097 3.44739 6.04614 3.53468 5.6231 3.66603V3.66114C5.61052 3.66643 5.59868 3.6705 5.58732 3.6744L5.58732 3.6744C5.5724 3.67953 5.55831 3.68438 5.54447 3.69132C5.51066 3.69948 5.47763 3.71172 5.44618 3.72722C5.35339 3.75741 5.26061 3.7933 5.17333 3.83001C5.15013 3.83899 5.12694 3.84939 5.10374 3.85979C5.08054 3.87019 5.05735 3.88059 5.03415 3.88957C5.00231 3.90466 4.96908 3.92118 4.93586 3.9377C4.90264 3.95422 4.86942 3.97074 4.83757 3.98584L4.68031 4.07639C4.65123 4.09122 4.62432 4.10861 4.59685 4.12636C4.5805 4.13693 4.56395 4.14762 4.54664 4.15798C4.30996 4.31054 4.09058 4.4892 3.89243 4.69234L3.88063 4.70458C3.85461 4.73492 3.82869 4.76436 3.80312 4.79339C3.75994 4.84244 3.71777 4.89034 3.67776 4.93954L3.66597 4.95096C3.02276 5.83858 2.70038 6.9326 2.7562 8.04131V8.39293H4.0261V8.03805C4.0261 6.49287 4.51833 5.53101 5.61366 5.03825C6.03198 4.86122 6.47389 4.7519 6.92366 4.71192H6.93546V3.4066L6.92052 3.40089ZM18.3315 4.93464L18.337 4.94606C18.9794 5.8345 19.3002 6.92934 19.2436 8.03805V8.39293H17.9745V8.02907C18.0012 7.37478 17.8699 6.72375 17.5916 6.13554C17.3242 5.63217 16.8965 5.24139 16.3799 5.02928C15.9686 4.85224 15.533 4.74211 15.0887 4.70295V3.40415C15.5283 3.44494 15.9631 3.53142 16.3869 3.66277V3.65624C16.4107 3.66705 16.4289 3.67347 16.4601 3.6845L16.4656 3.68643C16.48 3.69155 16.4935 3.69666 16.5069 3.70172C16.5255 3.70876 16.5437 3.71568 16.5638 3.72233C16.6508 3.75085 16.7321 3.78447 16.8157 3.81905L16.8304 3.82512C16.869 3.83868 16.9054 3.85549 16.9381 3.87064C16.9488 3.87555 16.959 3.88028 16.9688 3.88467C17.038 3.91486 17.1088 3.95076 17.1654 3.98094C17.2031 4.00053 17.2399 4.0215 17.2744 4.04116C17.2931 4.0518 17.311 4.06205 17.3281 4.0715C17.3563 4.08706 17.3808 4.1037 17.4044 4.11971C17.4216 4.1314 17.4383 4.14275 17.4555 4.15308C17.693 4.30646 17.9147 4.48594 18.1152 4.68745L18.1223 4.69969C18.1962 4.77393 18.2662 4.85224 18.3315 4.93464Z" fill="#ADAFBB" fillOpacity="0.7"/>
          <path d="M15.1252 2.49053V5.37944C15.1252 5.74343 14.8299 6.03825 14.4652 6.03825C14.1006 6.03825 13.8052 5.74343 13.8052 5.37944V2.49712C13.8019 2.13312 14.0956 1.83583 14.4603 1.83336C14.8249 1.83089 15.1227 2.12324 15.1252 2.48724V2.49053Z" fill="#ADAFBB" fillOpacity="0.7"/>
          <path d="M8.195 2.501V5.38276C8.195 5.74834 7.89929 6.04475 7.53459 6.04475C7.16988 6.04475 6.875 5.74834 6.875 5.38276V2.501C6.875 2.13543 7.16988 1.83984 7.53459 1.83984C7.89929 1.83984 8.195 2.13543 8.195 2.501" fill="#ADAFBB" fillOpacity="0.7"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M2.75 15.501V8.39293H19.25V15.501C19.25 18.6006 17.519 20.1667 14.0883 20.1667H7.90379C4.48104 20.1667 2.75 18.6006 2.75 15.501ZM6.47176 12.3446C6.47176 12.7746 6.8101 13.1235 7.22713 13.1235C7.65202 13.1235 7.99036 12.7665 7.98249 12.3364C7.98249 11.9064 7.64415 11.5575 7.23499 11.5575H7.22713C6.8101 11.5575 6.47176 11.9145 6.47176 12.3446ZM10.2407 12.3446C10.2407 12.7746 10.5869 13.1235 11.0039 13.1235C11.421 13.1235 11.7593 12.7746 11.7593 12.3364C11.7593 11.9145 11.421 11.5656 11.0039 11.5575H10.9961C10.5791 11.5656 10.2407 11.9145 10.2407 12.3446ZM14.7729 13.1235C14.3559 13.1235 14.0175 12.7746 14.0175 12.3446C14.0175 11.9145 14.348 11.5656 14.7729 11.5656C15.1899 11.5656 15.5283 11.9145 15.5283 12.3446C15.5283 12.7746 15.1899 13.1235 14.7729 13.1235ZM14.7729 16.4503C14.3559 16.4503 14.0175 16.1014 14.0097 15.6714C14.0097 15.2413 14.348 14.8924 14.765 14.8924H14.7729C15.1899 14.8924 15.5283 15.2413 15.5283 15.6714C15.5283 16.1014 15.1899 16.4503 14.7729 16.4503ZM11.0039 16.4504C10.5869 16.4504 10.2407 16.1014 10.2407 15.6714C10.2407 15.2413 10.5791 14.8924 10.9961 14.8843H11.0039C11.421 14.8924 11.7514 15.2413 11.7593 15.6633C11.7593 16.1014 11.421 16.4504 11.0039 16.4504ZM7.22711 16.4504C6.81009 16.4504 6.47175 16.1014 6.47175 15.6714C6.46388 15.2413 6.80222 14.8843 7.22711 14.8843C7.64414 14.8843 7.98248 15.2332 7.98248 15.6633C7.98248 16.0933 7.64414 16.4504 7.22711 16.4504Z" fill="#ADAFBB" fillOpacity="0.7"/>
          </svg>
          }
          type={"text"}
          name={"data"}
          id={"data"}
          placeholder={"data do evento"}
        />
        <InputForm
          value={state.hour}
          onChange={(e) => handleChange(e.target.value, "hour")}
          icon={<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.9561 9.47806C17.9561 14.1579 14.1579 17.9561 9.47806 17.9561C4.79817 17.9561 1 14.1579 1 9.47806C1 4.79817 4.79817 1 9.47806 1C14.1579 1 17.9561 4.79817 17.9561 9.47806Z" stroke="#ADAFBB" strokeWidth="1.27171" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.6231 12.1741L9.99491 10.6056C9.5371 10.3343 9.16406 9.68153 9.16406 9.14741V5.67142" stroke="#ADAFBB" strokeWidth="1.27171" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>}
          type={"text"}
          name={"hour"}
          id={"hour"}
          placeholder={"hora do evento"}
        />
        <InputForm
          value={state.location}
          onChange={(e) => handleChange(e.target.value, "location")}
          icon={<svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4.41453 1.17096C7.1456 -0.415907 10.5025 -0.388171 13.208 1.24362C15.8868 2.90864 17.515 5.88022 17.4998 9.0768C17.4374 12.2524 15.6916 15.2375 13.5093 17.5451C12.2498 18.883 10.8408 20.066 9.31105 21.07C9.15351 21.1611 8.98094 21.2221 8.80186 21.25C8.6295 21.2427 8.46165 21.1917 8.31344 21.1018C5.97803 19.5932 3.92917 17.6675 2.26541 15.4175C0.873234 13.5392 0.0822932 11.27 0 8.91802C-0.0018073 5.71531 1.68346 2.75784 4.41453 1.17096ZM5.9927 10.2434C6.4521 11.376 7.53647 12.1147 8.7395 12.1147C9.52763 12.1204 10.2852 11.8047 10.8435 11.238C11.4018 10.6713 11.7143 9.90073 11.7116 9.09791C11.7158 7.87248 10.9943 6.76533 9.88408 6.29341C8.77384 5.82148 7.4938 6.07788 6.64164 6.94287C5.78949 7.80787 5.5333 9.11084 5.9927 10.2434Z" fill="#ADAFBB" fillOpacity="0.7"/>
          <path opacity="0.4" d="M8.75 25C12.2018 25 15 24.4404 15 23.75C15 23.0596 12.2018 22.5 8.75 22.5C5.29822 22.5 2.5 23.0596 2.5 23.75C2.5 24.4404 5.29822 25 8.75 25Z" fill="#ADAFBB" fillOpacity="0.7"/>
          </svg>
          }
          type={"text"}
          name={"location"}
          id={"location"}
          placeholder={"localização do evento"}
        />
        <InputForm
          value={state.duration}
          onChange={(e) => handleChange(e.target.value, "duration")}
          icon={<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.9561 9.47806C17.9561 14.1579 14.1579 17.9561 9.47806 17.9561C4.79817 17.9561 1 14.1579 1 9.47806C1 4.79817 4.79817 1 9.47806 1C14.1579 1 17.9561 4.79817 17.9561 9.47806Z" stroke="#ADAFBB" strokeWidth="1.27171" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.6231 12.1741L9.99491 10.6056C9.5371 10.3343 9.16406 9.68153 9.16406 9.14741V5.67142" stroke="#ADAFBB" strokeWidth="1.27171" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          }
          type={"text"}
          name={"duration"}
          id={"duration"}
          placeholder={"duração"}
        />
        <InputForm
          value={state.image}
          onChange={(e) => handleChange(e.target.value, "image")}
          icon={<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M24.1921 18.0031L20.4848 9.33296C19.8096 7.74581 18.8029 6.84564 17.6539 6.78642C16.5169 6.7272 15.4154 7.52077 14.5744 9.03685L12.324 13.0758C11.8502 13.9286 11.1751 14.4379 10.4407 14.4971C9.69455 14.5682 8.94835 14.1773 8.34429 13.4075L8.08371 13.0758C7.24276 12.0217 6.20045 11.5124 5.13446 11.619C4.06846 11.7256 3.15644 12.4599 2.55238 13.6562L0.503295 17.7425C-0.231057 19.2231 -0.159991 20.9405 0.70465 22.3381C1.56929 23.7358 3.07353 24.5767 4.7199 24.5767H19.8333C21.4205 24.5767 22.901 23.7832 23.7775 22.4566C24.6777 21.13 24.8198 19.4599 24.1921 18.0031Z" fill="#ADAFBB"/>
          <path d="M6.36528 8.0068C8.57631 8.0068 10.3686 6.21441 10.3686 4.00339C10.3686 1.79236 8.57631 -1.71661e-05 6.36528 -1.71661e-05C4.15427 -1.71661e-05 2.36188 1.79236 2.36188 4.00339C2.36188 6.21441 4.15427 8.0068 6.36528 8.0068Z" fill="#ADAFBB"/>
          </svg>
          }
          type={"text"}
          name={"image"}
          id={"image"}
          placeholder={"imagem"}
        />
        <InputForm
          value={state.price}
          onChange={(e) => handleChange(e.target.value, "price")}
          icon={<svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7319 11.9941H6.14014C7.04346 14.5576 9.21631 15.9004 11.9751 15.9004C12.8784 15.9004 13.9526 15.8394 14.4531 15.6929V18.061C13.916 18.2197 12.854 18.3052 11.9629 18.3052C7.71484 18.3052 4.28467 16.1445 3.24707 11.9941H0.793457V10.2363H2.9541C2.92969 9.89453 2.91748 9.55273 2.91748 9.19873C2.91748 8.83252 2.92969 8.46631 2.96631 8.12451H0.793457V6.3667H3.24707C4.29688 2.22852 7.72705 0.0800781 11.9629 0.0800781C12.8174 0.0800781 13.916 0.189941 14.4287 0.348633V2.7168C13.8916 2.59473 12.854 2.49707 11.9873 2.49707C9.24072 2.49707 7.05566 3.82764 6.15234 6.3667H12.7319V8.12451H5.76172C5.7251 8.46631 5.70068 8.82031 5.70068 9.19873C5.70068 9.55273 5.7251 9.90674 5.76172 10.2363H12.7319V11.9941Z" fill="#ADAFBB" fill-opacity="0.7"/>
          </svg>
          }
          type={"text"}
          name={"price"}
          id={"price"}
          placeholder={"preço"}
        />
        <select
          id="category"
          value={state.category}
          onChange={(e) => handleChange(e.target.value, "category")}
          className=" w-full rounded-md text-center mt-3"
        >
          <option value="" className="rounded-md" disabled selected hidden>Seleciona a categoria</option>
          <option value="espetaculos"className="">Espetáculos</option>
          <option value="festas">Festas</option>
          <option value="experiencias">Experiências</option>
        </select>
        <div className="flex justify-center">
          <Btn name={"Criar"} />
        </div>
      </form>
      <div onClick={handleCancelar} className="flex justify-center">
        <BtnCancelar name={"Cancelar"} />
      </div>
      <div className="w-full absolute bottom-0">
        <NavBar />
      </div>
    </div>
  );
};
