const api = require("express").Router()
const path = require("path")
const jsonWebToken = require("jsonwebtoken")
const configJson = require("./../../config.json")
const PersonDb = require("../models/registerModel")
api.get("/resetPass", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "confirmCodPass.html"))
});


api.post("/resetPass", async (req, res) => {
  try {
    const {jwt, senha} = req.body
    jsonWebToken.verify(jwt, configJson.secretKey, async(err, sucess) => {
      if (err) {
        res.status(403).send({msg: "The time limit has expired, make a new request to change password again."})
        return
      }
      const {email} = sucess
      const db = await PersonDb.findOne({email})
      db.senha = senha
      res.status(200).send({msg: "password was changed successfully", alterd: true})
      await db.save()
    })
  } catch (error) {
    res.status(404).send({msg: "an unexpected error occurred"})
  }
});

module.exports = api
