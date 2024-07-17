const products = require("../models/products");
const rota = require("express").Router();
rota.put("/db/editProduct", async(req, res) => {
  try {
    const {nome,  valor} = req.body
    const productFind =  await products.findOne({nome: nome})
    if (productFind == null) {
      res.send({status: 404, msg: "The sent data was not found 404" }).status(404)
    }
    productFind.valor = valor
    productFind.save()
    res.send({status: 200, msg: "the data has been updated successfully."})
  } catch (error) {
    res.send({status: 204, msg: "an unexpected error occurred"}).status(204)
  }
});

module.exports = rota