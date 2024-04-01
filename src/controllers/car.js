"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | 
------------------------------------------------------- */
//! Car Controller:

const Car = require("../models/car");
const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Car, {}, ["createdId", "updatedId"]);

    res.status(200).send({
      error: false,
      message: "Cars Listed successfully",
      details: await res.getModelListDetails(Car),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Car.create(req.body);

    res.status(201).send({
      error: false,
      message: "Car created successfully",
      data,
    });
  },
  read: async (req, res) => {
    const data = await Car.findOne({ _id: req.params.id }).populate([
      "createdId",
      "updatedId",
    ]);

    res.status(200).send({
      error: false,
      message: "Car Listed successfully",
      data,
    });
  },
  update: async (req, res) => {
    const data = await Car.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      message: "Car updated successfully",
      data,
      new: await Car.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Car.deleteOne({ _id: req.params.id });

    const { deletedCount } = data;
    res.status(deletedCount ? 201 : 404).send({
      error: !deletedCount,
      message: deletedCount ? "Car deleted successfully" : "Car not found",
      data,
    });
  },

  avaliableCarsList: async (req, res) => {
    const { startDate, endDate } = req.body;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    if (sDate >= eDate) {
      res.errorStatusCode = 400;
      throw new Error("End date must be greater than start date");
    }

    let data = await Car.find({});

    for (let i = 0; i < data.length; i++) {
      const { _id } = data[i];

      const reservation = await Reservation.find({ carId: _id });
      for (let j = 0; j < reservation.length; j++) {
        const { startDate, endDate } = reservation[j];
        const recordedSDate = new Date(startDate);
        const recordedEDate = new Date(endDate);
        if (
          (sDate >= recordedSDate && sDate <= recordedEDate) ||
          (eDate >= recordedSDate && eDate <= recordedEDate) ||
          (sDate <= recordedSDate && eDate >= recordedEDate)
        ) {
          data[i].avaliable = false;
          break;
        } else {
          data[i].avaliable = true;
        }
      }
    }

    data = data?.filter((data) => data.avaliable !== false);

    res.status(200).send({
      error: false,
      message: "Avaliable Cars Listed successfully",
      data,
    });
  },
};

// const data = await Reservation.find({
//   startDate: { $gte: sDate },
//   endDate: { $lte: eDate },
// }).populate("carId");
