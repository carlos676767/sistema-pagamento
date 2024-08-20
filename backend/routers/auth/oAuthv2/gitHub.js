const api = require("express").Router()

const OauthGitHub = require("../../../controllers/AouthController")
api.get("/loginGitHub", OauthGitHub.generaterLinkGiThub)
api.post("/tokenGit", OauthGitHub.TokenFromSucessGit)
module.exports = api