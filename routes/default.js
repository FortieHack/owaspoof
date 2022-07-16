const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

const uid = require("../config").uid;

router.get("/", (req, res) => {
  res.send({ status: true, route: req.route, headers: req.headers });
  console.log(uid);
});

router.get("/sh/" + uid, (req, res) => {
  console.log(uid);
  Account.find()
    .then((account) => {
      console.log(account);
      res.send({ data: account });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
