const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require("../../middleware");
const { schemas } = require("../../models/user");

//signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationCode", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

//signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
