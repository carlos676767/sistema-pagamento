const api = require("express").Router()
const ConfirmSenha = require("../controllers/ConfirmPassController");
api.post("/validar", ConfirmSenha.busqueCodDb)
module.exports = api;


