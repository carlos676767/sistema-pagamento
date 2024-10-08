const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");
const imgRouter = require("./routers/imageRouter/imageRouter")
const confirm = require("./routers/confirm")
const connectDb = require("./db/db");
const cors = require('cors')
const login = require("./routers/auth/login")
const passRouter = require("./routers/pass/resetPass")
const produtos = require("./routers/products/produtos")
const routerGitHub = require("./routers/auth/oAuthv2/gitHub")
const registro = require("../backend/routers/auth/registro")
const frete = require("./routers/frete/frete")
api.use(cors())
api.use(bodyParser.json());
api.use(confirm)
api.use(login)
api.use(passRouter)
api.use(produtos)
api.use(routerGitHub)
api.use(express.static("image"))
api.use(registro)
api.use(frete)
api.use(imgRouter)
const port = 8080 || config.port;
(async () => {
  await connectDb.connectDataBase()
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();

