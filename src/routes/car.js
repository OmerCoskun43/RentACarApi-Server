"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//! routes/car:

const { isLogin, isAdmin } = require("../middlewares/permissions");
const {
  list,
  create,
  read,
  update,
  delete: _delete,
} = require("../controllers/car");

router.route("/").get(list).post(isAdmin, create);

router.route("/:id").put(isAdmin, update).get(read).delete(isAdmin, _delete);

module.exports = router;
