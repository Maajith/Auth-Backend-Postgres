const db = require("../db/index");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
    try {
       const { rows } = await db.query("SELECT user_id, email FROM users");
       
       return res.status(200).json({
        success: true,
        length: rows.length,
        users: rows,
       })
    } catch (error) {
        console.log(error);
    }
}

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await hash(password, 10);

        await db.query(`insert into users(email,password) values ($1 , $2)`, [
            email,
            hashedPassword
        ]);

        return res.status(201).json({
          success: true,
          message: "The registraion was successfull",
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: error.message,
        });
    }
}

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    email: user.email,
  };

  try {
    const token = await sign(payload, SECRET);
     
    // Storing token in cookies, must include cookie-parser package in index
     return res.status(200).cookie("token", token, { httpOnly: true }).json({
       success: true,
       message: "Logged in succefully",
     });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Protected route, only allowed if the user has token in the cookie.
exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logOut = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};