const express = require("express")
const api = express()
const config = require("../config.json")
const consign = require("consign")

consign()
  .include('./routers')
  .into(api);

const port = 8080 || config.port
api.listen(port, () => {
    console.log(`server running on the port ${port}`)
})