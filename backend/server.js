const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");
const deleteProduct = require("./routers/deleteProduct")
const registerUser = require("./routers/registro")
const confirm = require("./routers/confirm")
const connectDb = require("./db/db");
const cors = require('cors')
const login = require("./routers/login")
const returnHome = require("./routers/sucessoPagamento")
const recuperarSenha = require("../backend/routers/recuperarSenha")
const pagePassReset = require("./routers/resetPass")
const produtos = require("./routers/pagamentos/produtos")
api.use(cors())
api.use(bodyParser.json());
api.use(deleteProduct)
api.use(registerUser)
api.use(confirm)
api.use(login)
api.use(returnHome)
api.use(recuperarSenha)
api.use(pagePassReset)
api.use(produtos)
api.use(express.static("pages"))
const port = 8080 || config.port;
(async () => {
  await connectDb();
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();

