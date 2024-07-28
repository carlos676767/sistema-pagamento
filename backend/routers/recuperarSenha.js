const api = require("express").Router()
const sendEmail = require("../email/alterarSenha");
const dbPessoas = require("../models/registerModel")
const jwt = require("jsonwebtoken")
const jsonConfig = require("../../config.json")
api.post("/recuperarSenha", async (req, res) => {
  try {
    const {email} = req.body
    const buscarEmail = await dbPessoas.findOne({email})
    if (!buscarEmail) {
      res.status(400).send({ msg: "email does not exist", sendEmail: false });
      return;
    };
    res.status(200).send({ msg: "check your inbox to confirm", sendEmail: true });
    const payLoad = jwt.sign({email}, jsonConfig.secretKey, {expiresIn: "5m"})
    console.log(payLoad);
    sendEmail(email, payLoad)
  } catch (error) {
    res.status(404).send({msg: 'error 404'})
  }
});

module.exports = api

//usuario envia email[x]
//ver se o email existe[x]
//se email existe envia um codigo para o usuario[x] 
//usuario[x]