const express = require("express");
const {
  getUserByEmail,
  checkUserPassword,
  addAuthSession,
  addUserAuth,
  validateSession,
  getUser,
  getSession,
} = require("./services/auth");
const app = express();
const { getMongoCollection } = require("../src/data/db");
const { ObjectId } = require("mongodb");
const {
  getTicketByUserId,
  buyTicket,
  cancelTicket,
} = require("./services/tickets");
const {
  changeUserInformation,
  createFavoriteEvent,
  depositUserWallet,
  getUserById,
  getUserFavorites,
  changeUserToPartner,
} = require("./services/users");
const {
  getEvents,
  getEventById,
  getEventsByCategory,
  createEventByCategory,
  removeEvent,
  createEventFeedback,
} = require("./services/events");

const PORT = 3060;

app.use(express.json());
// app.use("/api", authorize);

async function authorize(req, res, next) {
  const token = req.header("authorization");
  const result = await validateSession(token);
  if (!result) {
    return res.sendStatus(401);
  }
  const session = await getSession(token);
  req.user = await getUser(session.uid);
  next();
}

app.post("/api/auth/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await getUserByEmail(req.body.email ?? "");
    if (!user) {
      return res.sendStatus(400);
    }
    const isCorrect = await checkUserPassword(user.password, req.body.password);
    if (isCorrect) {
      //create session
      const token = await addAuthSession(user._id);
      return res.status(200).json({ token });
    }

    return res.sendStatus(403);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const {
      nome,
      email,
      password,
      passwordConf,
      datadenascimento,
      carteira = 0,
      parceiro = false,
      imagem,
    } = req.body;

    if (password !== passwordConf) {
      return res.status(400).json({ message: "passwords_dont_match" });
    }

    const user = await getUserByEmail(email ?? "");
    if (user) {
      return res.status(400).json({ message: "email_already_in_use" });
    }

    const userId = await addUserAuth({
      nome,
      email,
      password,
      datadenascimento,
      carteira,
      parceiro,
      imagem:
        imagem.length > 0
          ? imagem
          : "https://img.freepik.com/free-icon/user_318-804790.jpg?w=2000",
    });

    const token = await addAuthSession(userId);
    return res.status(200).json({ _id: userId, token });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

/// ADICIONAR VERIFICAÇÕES A PARTIR DAQUI

//METHOD PATCH - Transformar user em parceiro - estruturar FEITO! 100%
app.patch("/api/users/partner", authorize, async (req, res) => {
  try {
    const userId = req.user._id;
    const { nomeDeEmpresa, email, numeroTelemovel } = req.body;

    const updatedUser = await changeUserToPartner(userId, req.body);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

//METHOD PATCH - Depositar dinheiro na carteira - estruturar FEITO! 100%
app.patch("/api/users/deposit", authorize, async (req, res) => {
  try {
    const userId = req.user;
    const { deposito } = req.body;

    const updatedUser = await depositUserWallet(userId, req.body);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

//METHOD PATCH - Atualizar o utilizador  - estruturar FEITO! 100%
app.patch("/api/users/profile", authorize, async (req, res) => {
  try {
    const { nome, email, password, passwordConf, datadenascimento } = req.body;
    const userId = req.user;

    const updatedUser = await changeUserInformation(userId, req.body);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Encontrar um utilizador - estrutura feito 100%
app.get("/api/users/profile", authorize, async (req, res) => {
  try {
    const user = req.user;
    const foundUser = await getUserById(user);

    return res.status(200).json(foundUser);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Encontrar um evento - estrutura FEITO! 100%
app.get("/api/events/event/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await getEventById(eventId);
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
  }
});

//METHOD GET - Encontrar favoritos do user
app.get("/api/users/favorites", authorize, async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await getUserFavorites(userId);
    return res.status(200).json(favorites);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Consultar o histórico do utilizador - estrutura FEITO 100%
app.get("/api/users/history", authorize, async (req, res) => {
  const userId = req.user._id;
  try {
    const history = await getTicketByUserId(userId);

    return res.status(200).json(history);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Encontrar um evento "ESPETÁCULOS" - estrutura FEITO 100%
app.get("/api/events/espetaculos", async (req, res) => {
  try {
    const categoria = "espetaculos";
    const eventos = await getEventsByCategory(categoria);

    return res.status(200).json(eventos);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Encontrar um evento "FESTAS" - estrutura FEITO 100%
app.get("/api/events/festas", async (req, res) => {
  try {
    const categoria = "festas";
    const eventos = await getEventsByCategory(categoria);

    return res.status(200).json(eventos);
  } catch (err) {
    console.log(err);
  }
});

// METHOD GET - Encontrar um evento "EXPERIENCIAS" - estrutura FEITO 100%
app.get("/api/events/experiencias", async (req, res) => {
  try {
    const categoria = "experiencias";
    const eventos = await getEventsByCategory(categoria);

    return res.status(200).json(eventos);
  } catch (err) {
    console.log(err);
  }
});

//METHOD POST - Criar um evento "ESPETACULOS" - estrutura feito 100%
app.post("/api/events/espetaculos", authorize, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      hour,
      location,
      image,
      duration,
      category,
      price,
      state,
    } = req.body;
    const categoria = "espetaculos";
    const evento = await createEventByCategory(req.body, categoria);

    return res.status(201).json({
      id: evento.insertedId,
    });
  } catch (err) {
    console.log(err);
  }
});

//METHOD POST - Criar um evento "FESTAS" - estrutura FEITO 100%
app.post("/api/events/festas", authorize, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      hour,
      location,
      image,
      duration,
      category,
      price,
      state,
    } = req.body;
    const categoria = "festas";
    const evento = await createEventByCategory(req.body, categoria);

    return res.status(201).json({
      id: evento.insertedId,
    });
  } catch (err) {
    console.log(err);
  }
});

//METHOD POST - Criar um evento "EXPERIENCIAS" - estrutura FEITO 100%
app.post("/api/events/experiencias", authorize, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      hour,
      location,
      image,
      duration,
      category,
      price,
      state,
    } = req.body;
    const categoria = "experiencias";
    const evento = await createEventByCategory(req.body, categoria);

    return res.status(201).json({
      id: evento.insertedId,
    });
  } catch (err) {
    console.log(err);
  }
});

//METHOD POST - Tornar um evento como favorito - estrutura FEITO 100%
app.post("/api/users/favorite", authorize, async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.body;

  try {
    const favoriteEvent = await createFavoriteEvent(userId, eventId);

    return res.status(200).json(favoriteEvent);
  } catch (err) {
    console.log(err);
  }
});

// METHOD POST - Comprar um bilhete para um evento - estrutura FEITO  100%
app.post("/api/tickets/:id/", authorize, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user;
    const quantity = req.body.quantity;

    const ticket = await buyTicket(userId, eventId, quantity);
    return res.status(201).json(ticket);
  } catch (err) {
    console.log(err);
  }
});

//METHOD POST - Submeter feedback a um evento - estrutura FEITO 100%
app.post("/api/events/event/:id/feedback", authorize, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user;
  const { comment, rating } = req.body;

  try {
    const feedback = await createEventFeedback(userId, eventId, req.body);

    return res.status(201).json(feedback);
  } catch (err) {
    console.log(err);
  }
});

//METHOD DELETE - Apagar a conta de utilizador 100%
app.delete("/api/users", authorize, async (req, res) => {
  const userId = req.user._id;
  try {
    const users = await getMongoCollection("users");
    await users.deleteOne({ _id: new ObjectId(userId) });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

//METHOD DELETE - Apagar/Cancelar um bilhete - estrutura FEITO - REEMBOLSO FEITO! 100%
app.delete("/api/tickets/:id", authorize, async (req, res) => {
  const ticketId = req.params.id;

  try {
    await cancelTicket(ticketId);
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

//METHOD DELETE - Apagar um evento - estrutura FEITO 100%
app.delete("/api/events/event/:id", authorize, async (req, res) => {
  const eventId = req.params.id;
  try {
    await removeEvent(eventId);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
