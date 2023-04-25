const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middleware");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post(
  "/",
  express.json(),
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:id", isValidId, ctrl.removeContact);

router.put("/:id", isValidId, express.json(), ctrl.updateContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
