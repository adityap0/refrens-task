var express = require("express");
var router = express.Router();
var User = require("../models/User");
/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    var users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
});
router.get("/search", async function (req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async function (req, res, next) {
  req.body.items = req.body.items.split(",");
  req.body.items = req.body.items.map((item) => {
    return item.trim();
  });
  req.body.name = req.body.name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  req.body.add = req.body.add.replace(/\b(\w)/g, (s) => s.toUpperCase());
  for (let i = 1; i <= 2; i++) {
    req.body.pin = req.body.pin.replace(`${req.body.pin[i]}`, "x");
  }
  try {
    var user = await User.create(req.body);
    console.log(`User Added`, user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
