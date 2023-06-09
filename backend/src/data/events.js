const { ObjectId } = require("mongodb");
const { getMongoCollection } = require("./db");


async function findEventById(id) {
    const events = await getMongoCollection("partyapp_events");
    return await events.findOne({ _id: new ObjectId(id) });
}

async function findEvents() {
    const events = await getMongoCollection("partyapp_events");
    return await events.find().toArray();
}

async function findEventsByCategory(categoria) {
    const events = await getMongoCollection(`${categoria}`);
    return await events.find().toArray();
}

async function insertEventByCategory(information, categoria) {
    const eventosGeral = await getMongoCollection("partyapp_events");
    const evento = await eventosGeral.insertOne(information);
    const eventosCategoria = await getMongoCollection(`${categoria}`);
    const espetaculo = await eventosCategoria.insertOne(information);

    return (
        espetaculo,
        evento
    )
}

async function updateEventFeedback(eventId, feedback) {
    const eventos = await getMongoCollection("partyapp_events");
    await eventos.updateOne(
      { _id: new Object(eventId) },
      { $push: { feedback: feedback } }
    );
    return await findEventById(eventId)
  }

  async function deleteEventById(eventId) {
    const eventos = await getMongoCollection("partyapp_events")
    return await eventos.deleteOne({_id: new ObjectId(eventId._id)})
  }

  async function deleteEventsByCategoryById(eventId, categoria) {
    const events = await getMongoCollection(`${categoria}`);
    return await events.deleteOne({ _id: new ObjectId(eventId) });
  }


module.exports = {
    insertEventByCategory,
    findEventById,
    findEvents,
    findEventsByCategory,
    updateEventFeedback,
    deleteEventById,
    deleteEventsByCategoryById
}