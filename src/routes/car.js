"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//! routes/car:

const { isAdmin } = require("../middlewares/permissions");
const {
  list,
  create,
  read,
  update,
  delete: _delete,
  avaliableCarsList,
} = require("../controllers/car");

router.route("/").get(list).post(isAdmin, create);

router.route("/avaliableCarsList").post(avaliableCarsList);

router.route("/:id").put(isAdmin, update).get(read).delete(isAdmin, _delete);

module.exports = router;
