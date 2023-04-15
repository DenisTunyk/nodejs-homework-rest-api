const express = require("express");

const restContacts = require("../../models/contacts");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middleware/");

const schema = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post(
  "/",
  express.json(),
  validateBody(schema.addSchema),
  ctrl.addContact
);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", express.json(), ctrl.updateContact);

module.exports = router;
