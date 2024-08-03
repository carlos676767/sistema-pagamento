const ProdutoController = require("../../controllers/ProdutoController");
const api = require("express").Router();
api.post("/pagamento", ProdutoController.postPagamento);
api.get("/db/listProdutos", ProdutoController.listProduct);
api.put("/db/editProduct", ProdutoController.updateProduct);
api.post("/produtos/db", ProdutoController.cadastrarProduct);
api.delete("/dbDelete/product", ProdutoController.deleteProduct);
api.post("/idProduct", ProdutoController.receberIdProduct)
api.post("/verifyTokenPay", ProdutoController.verifyIdPaginaPay)

module.exports = api