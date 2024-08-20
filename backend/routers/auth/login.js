const LoginController = require("./../../controllers/LoginController")
const api = require("express").Router()
api.use(LoginController.verifyJwt)
api.post("/login", LoginController.loginPerson);

module.exports = api