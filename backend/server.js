const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");

const confirm = require("./routers/confirm")
const connectDb = require("./db/db");
const cors = require('cors')
const login = require("./routers/login")
const recuperarSenha = require("../backend/routers/recuperarSenha")
const pagePassReset = require("./routers/resetPass")
const produtos = require("./routers/products/produtos")
const routerGitHub = require("./routers/auth/oAuth/gitHub")
const registro = require("../backend/routers/auth/registro")
api.use(cors())
api.use(bodyParser.json());

api.use(confirm)
api.use(login)
api.use(recuperarSenha)
api.use(pagePassReset)
api.use(produtos)
api.use(routerGitHub)
api.use(express.static("public"))
api.use(registro)
const port = 8080 || config.port;
(async () => {
  await connectDb();
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();

