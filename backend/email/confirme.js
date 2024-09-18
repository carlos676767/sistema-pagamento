
class ConfirmarEmail {
  static #nodemailer = require("nodemailer");
  static #jsonConfig = require("../../config.json");
  static #PaginaHtmlEmail = require("./emailConfirm");

  static CodigoConfirmacao() {
    return Array.from(Array(6).keys()).map(data => data + Math.floor(Math.random() * 30)).join("")
  }

  static #configEmail(){
   return this.#nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: this.#jsonConfig.email,
        pass: this.#jsonConfig.pass
      }
    })
  }

  static async enviarEmailConfirmacao(email, codigo){
    try {
      await this.#configEmail().sendMail({
        from: this.#jsonConfig.email,
        to: email,
        subject: "✉️ Confirmação de E-mail Necessária!",
        html: this.#PaginaHtmlEmail(codigo)
      })
    } catch (error) {
      throw new Error("Error ao enviar o email, tente novamente.", error)
    }
  }
}

module.exports = ConfirmarEmail