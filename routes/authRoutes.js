const { Router } = require('express');
const { getUsers, register, login, protected, logOut } = require("../controllers/auth");
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { userAuth } = require('../middlewares/authMiddleware');

const router = Router();

router.get("/getUsers", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);

// Protected route, only allowed if the user has token in the cookie - done by authMiddleware
router.get("/dashboard", userAuth, protected);
router.get("/logout", logOut);

module.exports = router;