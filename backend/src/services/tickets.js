const { ObjectId } = require("mongodb");
const {
  findTicketByUser,
  insertTicket,
  removeTicketById,
  findTicket,
} = require("../data/tickets");
const { updateUserWallet, findUserById, findUser } = require("../data/users");
const { getEventById } = require("./events");
const { getUserById } = require("./users");
const { findEventById } = require("../data/events");

async function getTicketByUserId(id) {
  return await findTicketByUser(id);
}

async function buyTicket(userId, eventId, quantity) {
  const event = await getEventById(eventId);
  const user = await findUserById(userId);

  const tickets = [];
  const saldo = user.carteira;
  const precoBilhete = event.price;

  console.log(saldo);
  console.log(precoBilhete);
  console.log(quantity);
  if (saldo >= precoBilhete * quantity.numero) {
    console.log(1, "oi");
    let novoSaldo = saldo - precoBilhete * quantity.numero;
    await updateUserWallet(user, novoSaldo);

    for (let i = 0; i < quantity.numero; i++) {
      console.log(2, "oi");
      const ticket = {
        eventId: new ObjectId(eventId),
        userId: userId._id,
        location: event.location,
      };

      console.log(3, ticket);
      const insertedTicket = await insertTicket(ticket);
      console.log(4, insertedTicket);
      tickets.push(insertedTicket);
    }
    return { tickets };
  } else {
    return "Não tem dinheiro suficiente!";
  }
}

async function cancelTicket(ticketId) {
  const ticket = await findTicket(ticketId);
  const event = await findEventById(ticket.eventId);
  const user = await findUser(ticket.userId);
  const novoSaldo = Number(user.carteira) + Number(event.price)
  await updateUserWallet(user, novoSaldo);
  return await removeTicketById(ticketId);
}

module.exports = {
  buyTicket,
  getTicketByUserId,
  cancelTicket,
};
