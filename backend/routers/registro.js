// const api = require("express").Router();
// const jwt = require("jsonwebtoken");
// const TempDados = require("../models/tempRegister");
// const db = require("../models/registerModel");
// const {randomCod, sendEmail} = require("../email/confirme")
// api.post("/register", async (req, res) => {
//   try {
//     const { nome, email, senha } = req.body;
//     validateEmptyData(nome, email, senha);
//     validePassWord(senha);
//     valideEmail(email);
//     await dadosRegisterDb(nome, email, senha, res);
//   } catch (error) {
//     res.send({ msg: error.message }).status(404);
//   }
// });

// function validateEmptyData(nome, email, senha) {
//   if (!nome && !email && !senha) {
//     throw new Error("empty data, fill in the data");
//   }
// }

// function validePassWord(pass) {
//   if (pass.length < 7)
//     throw new Error("the password must have at least 7 characters");
// }

// function valideEmail(email) {
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (!regex.test(email)) throw new Error("Enter a valid email address.");
// }

// async function dadosRegisterDb(nome, email, senha, res) {
//   const registro = await db.findOne({ email });
//   if (registro) {
//     throw new Error("the email already exists, register another email, thank you.");
//   }
//   const codigo = randomCod()
//   await sendEmail(email, codigo)
//   const tempMyDados = new TempDados({nome: nome, email:email,senha: senha, codigo: codigo})
//   await tempMyDados.save()
//   res.status(200).send({registerParser: true})
// }

// module.exports = api;