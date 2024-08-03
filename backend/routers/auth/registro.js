const RegistroUser = require("../../controllers/RegistroController");

const api = require("express").Router()
api.post("/register", RegistroUser.cadastrarUser);
module.exports = api