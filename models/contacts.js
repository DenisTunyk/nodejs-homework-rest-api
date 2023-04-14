const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function getAll() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

async function getById(id) {
  const contacts = await getAll();

  const contact = contacts.find((contact) => contact.id === id);

  return contact || null;
}

async function add(data) {
  const newContact = {
    id: nanoid(21),
    ...data,
  };
  const contacts = await getAll();
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function remove(id) {
  const contacts = await getAll();
  console.log();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  updateContacts(contacts);
  return result;
}

async function updateById(id, body) {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  // const name = "";
  // const email = "";
  // const phone = "";

  // if (typeof body.name === "undefined") {
  //   name = contacts[index].name;
  // } else {
  //   name = body.name;
  // }
  // if (typeof body.email === "undefined") {
  //   email = contacts[index].email;
  // } else {
  //   email = body.email;
  // }
  // if (typeof body.phone === "undefined") {
  //   phone = contacts[index].phone;
  // } else {
  //   phone = body.phone;
  // }
  console.log("name");

  contacts[index] = { ...contacts[index], ...body };
  updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  add,
  getById,
  remove,
  getAll,
  updateById,
};
