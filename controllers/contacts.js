const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const { HttpError, ctrlWrapper } = require("../helpers");

const contacts = require("../models/contacts");

const listContacts = async (req, res) => {
  const result = await contacts.getAll();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const result = await contacts.add(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (JSON.stringify(body) === "{}") {
    throw HttpError(400, "missing fields");
  }
  const result = await contacts.updateById(id, body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.remove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
