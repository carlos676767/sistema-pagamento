const FreteController = require("../../controllers/freteController");
const api = require("express").Router()
api.post("/frete", FreteController.postCalculeFrete)
module.exports = api
