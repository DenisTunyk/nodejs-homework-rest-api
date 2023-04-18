const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongoosError } = require("./../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongoosError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const Contact = model("contacts", contactSchema);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

// const res = Contact.create({
//   name: "Harryk",
//   email: "34938293",
//   phone: "23932938",
//   favorite: "false",
// }).then((data) => console.log(data));

module.exports = { Contact, schemas };
