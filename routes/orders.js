// orders route
const express = require("express");
const db = require("../db/db");
const Order = require("../models/Orders.model");
const router = express.Router();

// protected (allow for admin)
router.get("/allorders", (req, res) => {
  Order.findAll()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => console.log("get order list error: ", err));
});

// protected (allow for current user)
// join all orders and all masters in current city
// and select masters that do not exists in the orders
router.post("/createorder", (req, res) => {
  let { client_name, master_name, city, clock_size, date, time } = req.body;
  Client.create({
    client_name,
    master_name,
    city,
    clock_size,
    date,
    time,
  })
    .then((order) =>
      res.status(200).json({
        msg: `Order at ${order.date} created`,
      })
    )
    .catch((err) =>
      res.status(401).json({
        errMsg: err.parent.detail,
      })
    );
});

// protected (allow only for admin)
router.put("/updateorder/:id", (req, res) => {
  let { master_name, clock_size, date, time } = req.body;
  Order.update(
    {
      master_name,
      clock_size,
      date,
      time,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] !== 0) {
        res.status(200).json({
          msg: "order updated",
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
router.delete("/deleteorder/:id", (req, res) => {
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result > 0) {
        res.status(200).json({
          msg: `Order deleted`,
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
