const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const Client = require("../models/Clients");
const router = express.Router();

// protected (allow for admin)
router.get("/allclients", (req, res) => {
  Client.findAll()
    .then((clients) => res.status(200).json(clients))
    .catch((err) => console.log("get all clients error: ", err));
});

// public
// register router with bcrypt
router.post("/register", (req, res) => {
  let {
    name,
    mail,
    password,
    city
  } = req.body;
  if (!name || !mail || !password) {
    return res.status(400).json({
      alert: "all fields are required",
    });
  }
  // check name length here or in front
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return console.log("gensalt error: ", err);
    }
    bcrypt.hash(password, salt, (hashErr, hash) => {
      if (hashErr) {
        throw hashErr;
      } else {
        password = hash;
        Client.create({
            name,
            mail,
            password,
            city,
          })
          .then((client) =>
            res.status(200).json({
              msg: `User ${client.name} created`,
            })
          )
          .catch((err) =>
            res.status(401).json({
              errMsg: err.parent.detail,
            })
          );
      }
    });
  });
});

// public
// login router with compare and jwt

// protected (allow for admin or current user)
router.put("/updateclient/:id", (req, res) => {
  let {
    name,
    mail,
    password,
    city
  } = req.body;
  Client.update({
      name,
      mail,
      password,
      city,
    }, {
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      if (result[0] !== 0) {
        res.status(200).json({
          msg: "client data updated",
        });
      } else {
        res.status(400).json({
          msg: "bad request",
        });
      }
    })
    .catch((err) =>
      res.status(401).json({
        errMsg: err.name,
      })
    );
});

// protected (allow for admin or current user)
router.delete("/deleteclient/:id", (req, res) => {
  Client.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      console.log("delete result: ", result);
      if (result > 0) {
        res.status(200).json({
          msg: `User deleted`,
        });
      } else {
        res.status(404).json({
          errMsg: "user does not found",
        });
      }
    })
    .catch((err) =>
      res.status(401).json({
        errMsg: err.name,
      })
    );
});
module.exports = router;