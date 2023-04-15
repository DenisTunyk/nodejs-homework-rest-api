const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const first = error.message.indexOf('"');
      const second = error.message.lastIndexOf('"');
      const errorField = error.message.substr(first + 1, second - 1);
      next(HttpError(400, `missing required ${errorField} field`));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
