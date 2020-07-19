// masters route
const express = require("express");
const db = require("../db/db");
const Master = require("../models/Masters");
const router = express.Router();

// protected (allow for registered clients)
router.get("/allmasters", (req, res) => {
  // add filter for engaged masters
  Master.findAll()
    .then((masters) => res.status(200).json(masters))
    .catch((err) =>
      res.json({
        errMsg: err,
      })
    );
});

// protected (allow for admin)
router.post("/register", (req, res) => {
  let {
    name,
    city
  } = req.body;
  let rate = 0;
  Master.create({
      name,
      city,
      rate,
    })
    .then((master) =>
      res.status(200).json({
        msg: `Master ${master.name} created`,
      })
    )
    .catch((err) =>
      res.status(401).json({
        errMsg: err.parent.detail,
      })
    );
});

// protected (allow for admin)
router.delete("/deletemaster/:id", (req, res) => {
  Master.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        msg: `Master deleted`,
      });
    })
    .catch((err) =>
      res.status(401).json({
        errMsg: err.name,
      })
    );
});

// protected (how to change rate with clients rate???)
// put route - count new rate and set to db
module.exports = router;