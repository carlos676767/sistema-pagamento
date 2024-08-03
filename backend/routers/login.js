const api = require("express").Router()
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../../config.json")
const DbLogin = require("../models/registerModel");

api.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET_KEY.secretKey, (err, decod) => {
      if (!err) {
        res.status(200).send({login: true})
      }
      res.status(401).send({msg: "the token is invalid", login: false})
      next();
    });
  }
  next()
});

api.post("/login", async(req, res) => {
  try {
    const {email,senha} = req.body
    const searchCredentials = await DbLogin.findOne({ email, senha})
    console.log(searchCredentials);
    if (searchCredentials) {
      const idUser = searchCredentials.id
      const payLoad = jwt.sign({idUser}, SECRET_KEY.secretKey, {expiresIn: "1h"})
      res.status(200).send({login: true, msg: "data successfully validated.", jwt: payLoad })
      return
    }
    res.status(401).send({msg: "the data is incorrect", login: false})
  } catch (error) {
    res.status(400).send({login: false, msg: "an error has occurred"})
  }
});

module.exports = api