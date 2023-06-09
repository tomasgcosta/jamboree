const { ObjectId } = require("mongodb");
const { getMongoCollection } = require("./db");


const collection = 'users'

async function findUser(id){
    const users = await getMongoCollection(collection);
    return users.findOne({ _id: id });
}

async function findUserById(user) {
  const users = await getMongoCollection(collection);
  return users.findOne({ _id: new ObjectId(user._id) });
}

async function updateUserToPartner(userId, nomeDeEmpresa, email, numeroTelemovel) {
  const users = await getMongoCollection(collection);

  return await users.updateOne(
    { _id: new ObjectId(userId) },
    {
      $set: {
        nome: nomeDeEmpresa,
        email: email,
        numeroTelemovel: numeroTelemovel,
        parceiro: true,
      },
    }
  );
}

async function updateUserWallet(userId, novoSaldo) {
  const users = await getMongoCollection(collection);
  const user = await users.findOne({ _id: new ObjectId(userId._id) });
  
  return await users.updateOne(
    { _id: new ObjectId(user._id) },
    { $set: { carteira: novoSaldo } }
  );
}

async function updateUserInformation(userId) {

  const users = await getMongoCollection("users");
  const user = await users.findOne({ _id: new ObjectId(userId._id) });

  return await users.updateOne({ _id: new ObjectId(userId._id) }, { $set: userId });

}

async function addEventFavorite(userId, event) {
  console.log(event);
  console.log(userId);
  const favorites = await getMongoCollection("favorites");

  const existFavorite = await favorites.findOne({
    userId: new ObjectId(userId),
    eventId: new ObjectId(event),
  });

  if (!existFavorite) {
    const newFavorite = await favorites.insertOne({
      userId: new ObjectId(userId),
      eventId: new ObjectId(event),
    });

    return await favorites.findOne(newFavorite._id)
    
  } else {
    await favorites.deleteOne({
      userId: new ObjectId(userId),
      eventId: new ObjectId(event),
    });
    return existFavorite
  }
}

async function findFavorites(userId) {
  const favorites = await getMongoCollection("favorites");
  const result = await favorites.find({
    userId: new ObjectId(userId),
  }).toArray();
  return result;
}

module.exports = {
  findUser,
  findUserById,
  updateUserToPartner,
  updateUserWallet,
  updateUserInformation,
  addEventFavorite,
  findFavorites,
}