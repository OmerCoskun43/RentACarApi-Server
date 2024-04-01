"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS 
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
//! routes/reservation:

const {
  list,
  create,
  read,
  update,
  delete: _delete,
  carReservationList,
} = require("../controllers/reservation");

const { isLogin, isAdmin } = require("../middlewares/permissions");

router.route("/:id/availability").get(isLogin, carReservationList);

router.route("/").get(isLogin, list).post(isLogin, create);
router
  .route("/:id")
  .get(isLogin, read)
  .put(isAdmin, update)
  .patch(isAdmin, update)
  .delete(isAdmin, _delete);

module.exports = router;
