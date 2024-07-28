const api = require("express").Router()
const jwt = require("jsonwebtoken") 
const TempDados = require("../models/tempRegister");
const RegisterModel = require("../models/registerModel");
const SECRET_KEY = require("../../config.json");
api.post("/validar", async (req, res) => {
  const { codigo } = req.body;
  const searchCodeConfirmation = await TempDados.findOne({codigo})
  if (searchCodeConfirmation) {
    const dados = {nome: searchCodeConfirmation.nome, email: searchCodeConfirmation.email, senha: searchCodeConfirmation.senha}
    const jwtAssine = jwt.sign({ dados }, SECRET_KEY.secretKey, {   expiresIn: "30s",  });
    const newRegister = new RegisterModel({ nome: searchCodeConfirmation.nome, email: searchCodeConfirmation.email, senha: searchCodeConfirmation.senha });

    
    await newRegister.save();
    await searchCodeConfirmation.deleteOne()
    res.status(200).send({ register: true, jwt: jwtAssine});
  } else {
    res.status(404).send({ msg: "status http error unexpected failure, try again later." });
  }
});

module.exports = api;
