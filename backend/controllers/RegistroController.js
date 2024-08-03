const Db = require("../models/tempRegister");
class RegistroUser {
  static async cadastrarUser(req, res) {
    const { nome, email, senha } = req.body
    const dadosDb = new Db({nome: nome, email:email,senha: senha, codigo: '854465451545445'});
    await dadosDb.save()
  }
}

module.exports = RegistroUser