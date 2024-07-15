const products = require("../models/products");

const api = require("express").Router()

api.get("/db/listProdutos", async(req, res) => {
  try {
    const product = await products.find({}, { _id: 0, "__v": 0 })
    res.send({status: 200, list: product}).status(404)
  } catch (error) {
    res.send({status: 404, msg: "impossible to query data 404"}).status(404)
  }
});


module.exports = api