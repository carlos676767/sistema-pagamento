const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");
const productRouters = require("./routers/postarProdutos");
const routerListProduct = require("./routers/listProdutos")
const updateProduct = require("./routers/updateProduct")
const deleteProduct = require("./routers/deleteProduct")
const registerUser = require("./routers/registro")
const confirm = require("./routers/confirm")
const connectDb = require("./db/db");
const cors = require('cors')
const login = require("./routers/login")
api.use(cors())
api.use(bodyParser.json());
api.use(productRouters);
api.use(routerListProduct);
api.use(updateProduct);
api.use(deleteProduct)
api.use(registerUser)
api.use(confirm)
api.use(login)

const port = 8080 || config.port;
(async () => {
  await connectDb();
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();
