const Product = require("../models/products");
const router = require("express").Router()
router.post("/produtos/db", async (req, res) => {
  try {
    const { nome, valor, descricao } = req.body;
    if (!nome && !valor, !descricao) {
      res
        .send({ falha: "the data must be entered.", status: 404 })
        .status(404);
    }
    const produto = new Product({nome: nome,  valor: valor, descricao: descricao });
    await produto.save()
    res.status(200).send({ status: 200, msg: "data placed successfully" });
  } catch (error) {
    res.status(404).send({ status: 404, msg: "unexpected error" });
  }
});

module.exports = router