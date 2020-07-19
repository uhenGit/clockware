// cities route
const express = require("express");
const router = express.Router();
const City = require("../models/Cities");

router.get("/allcities", (req, res) => {
  City.findAll()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) =>
      res.status(404).json({
        errMsg: "not found",
      })
    );
});
router.post("/addcity", (req, res) => {
  console.log(req.body);
  const name = req.body;
  City.create(name)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) =>
      res.status(400).json({
        errMsg: `create city error: ${err}`,
      })
    );
});
router.get("/allcities/:id", (req, res) => {
  City.findAll({
      where: {
        id: req.params.id,
      },
    })
    .then((city) => {
      res.status(200).json(city[0].dataValues);
    })
    .catch((err) =>
      res.status(404).json({
        errMsg: `city not found. ${err}`,
      })
    );
});
module.exports = router;