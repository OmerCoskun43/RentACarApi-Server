"use strict";

const router = require("express").Router();

router.use("/", require("./document"));
router.use("/auth", require("./auth"));
router.use("/users", require("./user"));
router.use("/tokens", require("./token"));
router.use("/cars", require("./car"));
router.use("/reservations", require("./reservation"));

module.exports = router;
