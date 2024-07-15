const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");
const productRouters = require("./routers/postarProdutos");
const routerListProduct = require("./routers/listProdutos")
const updateProduct = require("./routers/updateProduct")
const connectDb = require("./db/dbProdutos");
api.use(bodyParser.json());
api.use(productRouters);
api.use(routerListProduct);
api.use(updateProduct);

const port = 8080 || config.port;
(async () => {
  await connectDb();
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();
