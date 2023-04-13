const express = require("express");

const restContacts = require("../../models/contacts");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require("../../middleware/");

const schema = require("../../schemas/contacts");

router.get("/:contactId", ctrl.getContactById);

router.post(
  "/",
  express.json(),
  validateBody(schema.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.removeContact);

router.put(
  "/:contactId",
  express.json(),
  validateBody(schema.addSchema),
  ctrl.updateContact
);

module.exports = router;
