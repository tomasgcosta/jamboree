import "react-toastify/dist/ReactToastify.css";
import { Home } from "./Components/Home";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Entrar } from "./Components/Entrar";
import { CriarConta } from "./Components/CriarConta";
import { GeralEventos } from "./Components/GeralEventos";
import { Perfil } from "./Components/Perfil";
import { Bilhetes } from "./Components/Bilhetes";
import { Favoritos } from "./Components/Favoritos";
import { CriarEvento } from "./Components/CriarEvento";
import { SerParceiro } from "./Components/SerParceiro";
import { EventoEspecifico } from "./Components/EventoEspecifico";
import { CarteiraRota } from "./Components/CarteiraRota";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <GeralEventos />
          </Route>
          <Route exact path="/escolha">
            <Home />
          </Route>
          <Route path="/entrar">
            <Entrar />
          </Route>
          <Route path="/criarconta">
            <CriarConta />
          </Route>
          <Route path="/geraleventos">
            <GeralEventos />
          </Route>
          <Route path="/favoritos">
            <Favoritos />
          </Route>
          <Route path="/bilhetes">
            <Bilhetes />
          </Route>
          <Route path="/perfil">
            <Perfil />
          </Route>
          <Route path="/events/event/:id">
            <EventoEspecifico />
          </Route>
          <Route path="/criarevento">
            <CriarEvento />
          </Route>
          <Route path="/serparceiro">
            <SerParceiro />
          </Route>
          <Route path="/carteiraroute">
            <CarteiraRota />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
