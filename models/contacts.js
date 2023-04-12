const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function givelistContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return res.json(JSON.parse(data));
  } catch {
    const err = new Error("Not found this file");
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacts = await givelistContacts();
    console.log(req.params.contactId);
    //console.log(contacts);
    // const contact = contacts.find(
    //   (contact) => contact.id === req.params.contactId
    // );
    res.json(JSON.parse(contacts));
  } catch {
    const err = new Error("Contacts is not defind");
    next(err);
  }
};

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
