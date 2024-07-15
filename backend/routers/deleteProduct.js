const api = require("express").Router();
const Product = require("../models/products");
api.delete("/dbDelete/product", async (req, res) => {
  try {
    const { nome } = req.body;
    await Product.deleteOne({ nome: nome });
    res.send({ msg: "value deleted successfully", deleted: true, status: 200 }).status(200);
  } catch (error) {
    res.send({ msg: "an error has occurred", deleted: false, status: 404 }).status(404);
  }
});

module.exports = api;
