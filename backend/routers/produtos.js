const { Product, newConnection } = require("../db/dbPagamento");

module.exports = (api) => {
  api.post("/produtos/db", async (req, res) => {
    try {
      const { nome, valor } = req.body;
      if (!nome && !valor) {
        res
          .send({ falha: "the data must be entered.", status: 404 })
          .status(404);
      }
      const produto = new Product({
        nome: nome,
        valor: valor,
      });
      await newConnection(produto);
      res.status(200).send({ status: 200, msg: "data placed successfully" });
    } catch (error) {
      res.status(404).send({ status: 404, msg: "unexpected error" });
    }
  });
};
