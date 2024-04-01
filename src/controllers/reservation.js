"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | 
------------------------------------------------------- */
//! Reservation Controller:

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Reservation, {}, ["carId", "userId"]);

    res.status(200).send({
      error: false,
      message: "Reservation Listed successfully",
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    const { startDate, endDate } = req.body;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (sDate >= eDate) {
      res.errorStatusCode = 400;
      throw new Error("End date must be greater than start date");
    }

    const { carId } = req.body;
    const reservation = await Reservation.find({ carId });

    for (let i = 0; i < reservation.length; i++) {
      const { startDate, endDate } = reservation[i];
      const recordedSDate = new Date(startDate);
      const recordedEDate = new Date(endDate);

      if (
        (sDate >= recordedSDate && sDate <= recordedEDate) ||
        (eDate >= recordedSDate && eDate <= recordedEDate) ||
        (sDate <= recordedSDate && eDate >= recordedEDate)
      ) {
        res.errorStatusCode = 400;
        throw new Error("Car is already reserved");
      }
    }

    const data = await Reservation.create(req.body);

    res.status(200).send({
      error: false,
      message: "Reservation created successfully",
      data,
    });
  },

  read: async (req, res) => {
    const data = await Reservation.findOne({ _id: req.params.id }).populate([
      "userId",
      "carId",
    ]);

    res.status(200).send({
      error: false,
      message: "Reservation Listed successfully",
      data,
    });
  },

  update: async (req, res) => {
    await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      message: "Reservation updated successfully",
      data: await Reservation.findOne({ _id: req.params.id }).populate([
        "userId",
        "carId",
      ]),
    });
  },

  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });
    const { deletedCount } = data;

    res.status(deletedCount > 0 ? 201 : 404).send({
      error: !deletedCount,
      message:
        deletedCount > 0
          ? "Reservation deleted successfully"
          : "Reservation not found",
    });
  },

  carReservationList: async (req, res) => {
    const data = await Reservation.find({ carId: req.params.id }).populate([
      "userId",
      "carId",
    ]);
    res.status(200).send({
      error: false,
      message: "Reservation Listed successfully",
      data,
    });
  },
};
