// In order to print the validation results
const { validationResult } = require("express-validator");

exports.validationMiddleware = (req, res, next) => {
  let errors = validationResult(req);
  
  // If we have any errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
