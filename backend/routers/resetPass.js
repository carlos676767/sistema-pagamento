const api = require("express").Router()
const path = require("path")
const jsonWebToken = require("jsonwebtoken")
const configJson = require("./../../config.json")
const personDb = require("../models/registerModel")
api.get("/resetPass", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "confirmCodPass.html"))
});



api.post("/resetPass", async (req, res) => {
  try {
    const {jwt, senha} = req.body
    console.log(jwt);
    jsonWebToken.verify(jwt, configJson.secretKey, (err, sucess) => {
      if (err) {
        res.status(403).send({msg: "The time limit has expired, make a new request to change password again."})
        return
      }
      const {email} = sucess
      console.log(email);
      console.log("commit testes")
    })
  } catch (error) {

  }
});

module.exports = api
