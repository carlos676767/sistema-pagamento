const express = require("express");
const api = express();
const config = require("../config.json");
const bodyParser = require("body-parser");
const productRouters = require("./routers/produtos");
const connectDb = require("./db/dbPagamento");

api.use(bodyParser.json());
api.use(productRouters);

const port = 8080 || config.port;
(async () => {
  await connectDb();
  api.listen(port, () => {
    console.log(`server running on the port ${port}`);
  });
})();
