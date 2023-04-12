// const fs = require('fs/promises')

const listContacts = async (req, res, next) => {
  res.json({ message: "template message colobarant" });
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
