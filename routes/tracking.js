const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const Tracking = require("../models/Tracking");

router.get("/", (req, res) => {
  res.send({ status: true, route: req.route, headers: req.headers });
});

router.get("/:id", (req, res) => {
  const encoding = req.params.id;
  const decoding = Buffer.from(encoding, "base64").toString("utf8");
  Tracking.findOne({ email: decoding })
    .then((tracking) => {
      if (tracking) {
        // tracking already exists
        console.log(tracking);
        // REDIRECT TO URL
        res.redirect("https://hrportal.msia.com.ng/");
      } else {
        // no tracking exists
        const data = new Tracking({
          email: decoding,
          count: 1,
        });
        data.save();
        // REDIRECT TO URL
        res.redirect("https://hrportal.msia.com.ng/");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
