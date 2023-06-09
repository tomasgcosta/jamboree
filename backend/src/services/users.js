const {
  updateUserInformation,
  addEventFavorite,
  findUserById,
  updateUserWallet,
  findUser,
  updateUserToPartner,
  findFavorites,
} = require("../data/users");

async function changeUserToPartner(userId, information) {
  const { nomeDeEmpresa, email, numeroTelemovel } = information;
  await updateUserToPartner(userId, nomeDeEmpresa, email, numeroTelemovel);
  return await findUser(userId);
}

async function depositUserWallet(userId, deposito) {
  const saldoAnterior = userId.carteira;
  const novoSaldo = Number(saldoAnterior) + Number(deposito.deposit);

  await updateUserWallet(userId, novoSaldo);
  return findUserById(userId);
}

async function changeUserInformation(userId, information) {
  const { nome, email, password, passwordConf, datadenascimento } = information;
  if (nome) {
    userId.nome = nome;
  }
  if (email) {
    userId.email = email;
  }
  if (password) {
    userId.password = password;
  }

  if (datadenascimento) {
    userId.datadenascimento = datadenascimento;
  }
  await updateUserInformation(userId);
  return findUserById(userId);
}

async function createFavoriteEvent(userId, event) {
  return await addEventFavorite(userId, event);
}

async function getUserById(userId) {
  return await findUserById(userId);
}
async function getUserFavorites(userId) {
  return await findFavorites(userId);
}

module.exports = {
  changeUserToPartner,
  depositUserWallet,
  changeUserInformation,
  createFavoriteEvent,
  getUserById,
  getUserFavorites,
};
