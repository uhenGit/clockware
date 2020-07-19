// orders route
const express = require("express");
const db = require("../db/db");
const Order = require("../models/Orders");
const router = express.Router();

// protected (allow for admin)
router.get("/allorders", (req, res) => {
  Order.findAll()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => console.log("get order list error: ", err));
});

// protected get orders by date and time
router.get("/getcurrentorders/:date/:time", (req, res) => {
  Order.findAll({
    where: {
      date: req.params.date,
      time: Number(req.params.time),
    },
  })
    .then((orders) => {
      let engaged_masters = [];
      orders.forEach((order) => {
        engaged_masters.push(order.dataValues.master_name);
      });
      console.log(engaged_masters);
      res.status(200).json({ engaged_masters });
    })
    .catch((err) =>
      res.status(400).json({
        errMsg: err.parent.routine,
      })
    );
});

// protected (allow for current user)
router.post("/createorder", (req, res) => {
  let {
    client_name,
    master_name,
    city_name,
    clock_size,
    date,
    time,
  } = req.body;
  Order.create({
    client_name,
    master_name,
    city_name,
    clock_size,
    date,
    time,
  })
    .then((order) =>
      res.status(200).json({
        msg: `Order at ${order.date} created`,
      })
    )
    .catch((err) => {
      res.status(400).json({
        errMsg: err.parent.routine,
      });
    });
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
      res.status(400).json({
        errMsg: err.parent.routine,
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
