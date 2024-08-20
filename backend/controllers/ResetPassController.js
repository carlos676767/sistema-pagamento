
const configJson = require("./../../config.json");
const sendEmail = require("../email/alterarSenha");
const dbPessoas = require("../models/registerModel");
const jsonWebToken = require("jsonwebtoken");
const path = require("path");
class ResetPass {
  static async solicitacaoTrocarSenha(req, res) {
    try {
      const { email } = req.body;
      const buscarEmail = await dbPessoas.findOne({ email });
      if (!buscarEmail) {
        res.status(400).send({ msg: "email does not exist", sendEmail: false });
        return;
      }
      res.status(200).send({ msg: "check your inbox to confirm", sendEmail: true });
      const payLoad = jsonWebToken.sign({ email }, configJson.secretKey, {  expiresIn: "5m", });
      sendEmail(email, payLoad);
    } catch (error) {
      res.status(404).send({ msg: "error 404" });
    }
  }

  static paginaTrocarSenha(req, res) {
    res.sendFile( path.join(__dirname, "..", "..", "frontend", "confirmCodPass.html")  );
  }

  static async trocarSenha(req, res) {
    try {
      const { jwt, senha } = req.body;
      jsonWebToken.verify(jwt, configJson.secretKey, async (err, sucess) => {
        if (err) {
          res.status(403).send({ msg: "The time limit has expired, make a new request to change password again.", err: true});
          return;
        }

        const { email } = sucess;
        const db = await dbPessoas.findOne({ email });
        db.senha = senha;
        res.status(200).send({ msg: "password was changed successfully", alterd: true });
        await db.save();
      });
    } catch (error) {
      res.status(404).send({ msg: "an unexpected error occurred" });
    }
  }
}

module.exports = ResetPass;
