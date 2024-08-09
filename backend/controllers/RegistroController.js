const Db = require("../models/tempRegister");
class RegistroUser {
  static async cadastrarUser(req, res) {
    const { nome, email, senha } = req.body;
    this.#validateEmptyData(nome, email, senha);
    this.#validePassWord(senha)
    this.#valideEmail(email)
    await this.#dadosRegisterDb(nome, email, senha, res)
  }

  static #validateEmptyData(nome, email, senha) {
    if (!nome && !email && !senha) {
      throw new Error("empty data, fill in the data");
    }
  }

  static #validePassWord(pass) {
    if (pass.length < 7) {
      throw new Error("the password must have at least 7 characters");
    }
  }

  static #valideEmail(email){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)){
      throw new Error("Enter a valid email address.");
    }
  }
 static async #dadosRegisterDb(nome, email, senha, res) {
    const registro = await Db.findOne({ email });
    if (registro) {
      throw new Error("the email already exists, register another email, thank you.");
    }
    const codigo = randomCod()
    await sendEmail(email, codigo)
    const tempMyDados = new Db({nome: nome, email:email,senha: senha, codigo: codigo})
    await tempMyDados.save()
    res.status(200).send({registerParser: true})
  }
}

module.exports = RegistroUser