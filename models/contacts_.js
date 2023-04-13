const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

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
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );
    res.json(contact);
  } catch {
    return res.status(404).json({ message: "Not found" });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contact = contacts.find(
      (contact) => contact.id === req.params.contactId
    );

    if (typeof contact !== "undefined") {
      const newContacts = contacts.filter(
        (value) => value.id !== req.params.contactId
      );
      console.log(newContacts);
      fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
      res.json({ message: "contact deleted" });
    } else {
      const err = new Error({ message: "Not found" });
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    return res.status(404).json({ message: "Not found" });
  }
};

const addContact = async (req, res, next) => {
  const newContact = {
    id: nanoid(21),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  if (req.body.name === "" || req.body.email === "" || req.body.phone === "") {
    const err = new Error("missing required name field");
    return res.status(400).json({ message: "missing required name field" });
  }

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    res.status(201).json(newContact);
  } catch {
    return res.status(400).json({ message: "missing required name field" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    res.end();
  } catch {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
