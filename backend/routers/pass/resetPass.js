const ResetPass = require("../../controllers/resetPassController");

const api = require("express").Router();
api.get("/resetPass", ResetPass.paginaTrocarSenha)
api.post("/resetPass", ResetPass.trocarSenha)
api.post("/recuperarSenha", ResetPass.solicitacaoTrocarSenha)
module.exports = api