const jwt = require("jsonwebtoken");
const DB = require("../models/registerModel");
const DbTemp = require("../models/tempRegister");
const SECRET_KEY = require("../../config.json");

class ConfirmSenha {
  static async busqueCodDb(req, res) {
    const { codigo } = req.body;
    const database = await DbTemp.findOne({ codigo });
    if (!database) {
      res.status(404).send({ message: "codigo nao encontrado." });
      return;
    }
    await ConfirmSenha.#createDadosDatabase(database.nome, database.email,  database.senha, database.id,  res  );
    await ConfirmSenha.#dropDataBase(DbTemp)
  }
  
  static async #createDadosDatabase(nome, email, senha, id, res) {
    try {
      const jwtJson = ConfirmSenha.#generateJwt(id);
      const dados = { nome: nome, email: email, senha: senha };
      const db = new DB({ nome: dados.nome, email: dados.email,senha: dados.senha,});
      await db.save();
      res.status(200).send({ register: true, jwt: jwtJson });
    } catch (error) {
      res.send(404).send({ message: "status http error unexpected failure, try again later.",});
    }
  }

  static #generateJwt(id) {
    return jwt.sign({ id }, SECRET_KEY.secretKey, { expiresIn: "30s" });
  }

  static async #dropDataBase(database){
   await database.db.dropCollection('temps')
  }
}

module.exports = ConfirmSenha;
