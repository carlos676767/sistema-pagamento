const {randomCod, sendEmail} = require("../email/confirme");
const Db = require("../models/tempRegister");

class RegistroUser {
  static async cadastrarUser(req, res) {
    try {
      const { nome, email, senha } = req.body;
       RegistroUser.#validateEmptyData(nome, email, senha);
      RegistroUser.#validePassWord(senha)
      RegistroUser.#valideEmail(email)
      await RegistroUser.#dadosRegisterDb(nome, email, senha, res)
    } catch (error) {
      res.send({msg: error.message})
      console.log(error.message)
    }
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
    };
    const codigo = randomCod()
    await sendEmail(email, codigo)
    const tempMyDados = new Db({nome: nome, email:email,senha: senha, codigo: codigo})
    await tempMyDados.save()
    res.status(200).send({registerParser: true})
  }
}

module.exports = RegistroUser