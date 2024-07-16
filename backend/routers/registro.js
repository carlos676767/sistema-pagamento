const api = require("express").Router()
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../../config.json")
api.post("/register", (req, res) => {
  try {
    const {nome,email,senha} = req.body
    validateEmptyData(nome,email,senha)
    validePassWord(senha)
    valideEmail(email)
    dadosRegisterDb(nome,email,senha, res)
  } catch (error) {
    res.send({msg: error.message}).status(404)
  }
});

function validateEmptyData(nome,email,senha) {
  if (!nome && !email && !senha) {
    throw new Error("empty data, fill in the data")
   
  }
}

function validePassWord(pass) {
  if (pass.length < 6) throw new Error("the password must have at least 7 characters")
}

function valideEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) throw new Error("Enter a valid email address.")
}

function dadosRegisterDb(nome, email, senha, res) {
  const dadoRegister = { nome, email, senha };
  if (dadoRegister) {
    const jwtAssine = jwt.sign(dadoRegister, SECRET_KEY.secretKey, {
      expiresIn: "30s",
    });
    res.send({ token: jwtAssine, register: true, status: 200 });
  }
}

module.exports = api