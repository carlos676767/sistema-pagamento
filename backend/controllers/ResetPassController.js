

class ResetPass {
  static #path = require("path")
  static #jsonWebToken = require("jsonwebtoken")
  static #dbPessoas = require("../models/registerModel");
  static #configJson = require("./../../config.json");
  static #sendEmail = require("../email/alterarSenha");


  static async solicitacaoTrocarSenha(req, res) {
    try {
      const { email } = req.body;
      const buscarEmail = await this.#dbPessoas.findOne({ email });

      if (!buscarEmail) {
        throw new Error("email does not exist")
      }

      res.status(200).send({ msg: "check your inbox to confirm", sendEmail: true });
      const payLoad = this.#jsonWebToken.sign({ email }, this.#configJson.secretKey, {  expiresIn: "5m", });
      this.#sendEmail.sendEmail(email, payLoad)
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }

  static paginaTrocarSenha(req, res) {
    res.sendFile( this.#path.join(__dirname, "..", "..", "frontend", "confirmCodPass.html")  );
  }

  static async trocarSenha(req, res) {
    try {
      const { jwt, senha } = req.body;
      const email = ResetPass.valideToken(jwt)

      const db = await this.#dbPessoas.findOne({ email });
      db.senha = senha;
      await db.save();
      res.status(200).send({ msg: "password was changed successfully", alterd: true });
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }

  static valideToken(tk){
    this.#jsonWebToken.verify(tk, this.#configJson, (err, decoded) => {
      if (err) {
        throw new Error("The time limit has expired, make a new request to change password again.")
      }
      return {email} = decoded
    })
  }
}

module.exports = ResetPass;
