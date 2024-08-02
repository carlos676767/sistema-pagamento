const ProdutoController = require("../../controllers/ProdutoController");
const api = require("express").Router()
api.post("/pagamento", ProdutoController.postPagamento);
api.get("/db/listProdutos", ProdutoController.listProduct);
api.put("/db/editProduct", ProdutoController.updateProduct);
api.post("/produtos/db", ProdutoController.cadastrarProduct)
module.exports = api