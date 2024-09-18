
class Email {
  static #nodemailer = require("nodemailer");
  static #config = require("../../config.json");
  static #emailHtml = require("./emailConfirmAlterarsenha");
  static #configEmail() {
    return this.#nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: this.#config.email,
        pass: this.#config.pass,
      },
    });
  }


  static sendEmail(email, link) {
    this.#configEmail().sendMail({ 
      from: this.#config.email,
      to: email,
      subject: "Confirmação de Alteração de Senha!",
      html: this.#emailHtml(`http://localhost:8080/resetPass/?jwt=${link}`)
    })
  }
}

module.exports = Email