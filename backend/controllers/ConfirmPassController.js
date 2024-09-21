



class ConfirmSenha {
  static SECRET_KEY = require("../../config.json");
  static jwt = require("jsonwebtoken");
  static DB = require("../models/registerModel");
  static DbTemp = require("../models/tempRegister");

  static async busqueCodDb(req, res) {
    const { codigo } = req.body;
    const database = await this.DbTemp.findOne({ codigo });
    
    if (!database) {
      res.status(404).send({ message: "codigo nao encontrado." });
      return;
    }

    await ConfirmSenha.#createDadosDatabase(database.nome, database.email,  database.senha, database.id,  res  );
    await ConfirmSenha.#dropDataBase(this.DbTemp)
  }
  
  static async #createDadosDatabase(nome, email, senha, id, res) {
    try {
      const jwtJson = ConfirmSenha.#generateJwt(id);
      const dados = { nome: nome, email: email, senha: senha };
      const db = new this.DB({ nome: dados.nome, email: dados.email,senha: dados.senha,});
      await db.save();
      res.status(200).send({ register: true, jwt: jwtJson });
    } catch (error) {
      res.send(404).send({ message: "status http error unexpected failure, try again later.",});
    }
  }

  static #generateJwt(id) {
    return this.jwt.sign({ id }, this.SECRET_KEY.secretKey, { expiresIn: "30s" });
  }

  static async #dropDataBase(database){
   await database.db.dropCollection('temps')
  }
}

module.exports = ConfirmSenha;
