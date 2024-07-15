const api = require("express").Router()
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../../config.json")
api.post("/register", (req, res) => {
  try {
    const {nome,email,senha} = req.body
    validateEmptyData(nome,email,senha, res)
    
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

module.exports = api


