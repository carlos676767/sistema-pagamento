const api = require("express").Router()
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../../config.json")
api.post("/register", (req, res) => {
  try {
    const {nome,email,senha} = req.body
    validateEmptyData(nome,email,senha, res)
    validePassWord(senha, res)
    valideEmail(email, res)
    dadosRegisterDb(nome,email,senha, res)
 

  } catch (error) {
    res.send({msg: "An error occurred, try again later"}).status(404)
  }
});

function validateEmptyData(nome,email,senha, res) {
  if (!nome && !email && !senha) {
    res
      .send({
        register: false,
        msg: "empty data, fill in the data",
        status: 400,
      })
      .status(400);
  }
}

function validePassWord(pass, res) {
    pass.length < 6 ? res.send({msg: "the password must have at least 7 characters"}).status(400) : null
}

function valideEmail(email, res) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    res.send({ msg: "Enter a valid email address.", status: 400 }).status(400);
  }
}

function dadosRegisterDb(nome, email, senha, res) {
  const dadoRegister = { nome, email, senha };
  const jwtAssine = jwt.sign(dadoRegister, SECRET_KEY.secretKey, {
    expiresIn: "30s",
  });
  res.send({ token: jwtAssine, register: true, status: 200 });
}

module.exports = api


