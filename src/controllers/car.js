"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | 
------------------------------------------------------- */
//! Car Controller:

const Car = require("../models/car");

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
};
