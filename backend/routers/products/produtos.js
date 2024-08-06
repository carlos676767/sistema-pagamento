const ProdutoController = require("../../controllers/ProdutoController");
const PagamentoController = require("../../controllers/pagamentoControllers")
const api = require("express").Router();
api.post("/pagamento", PagamentoController.postPagamento);
api.get("/db/listProdutos", ProdutoController.listProduct);
api.put("/db/editProduct", ProdutoController.updateProduct);
api.post("/produtos/db", ProdutoController.cadastrarProduct);
api.delete("/dbDelete/product", ProdutoController.deleteProduct);
api.post("/idProduct", PagamentoController.receberIdProduct)
api.post("/verifyTokenPay", PagamentoController.verifyIdPaginaPay)

module.exports = api