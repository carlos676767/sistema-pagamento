const nodemailer = require("nodemailer");
const config = require("../../config.json");
const emailHtml = require("./emailConfirmAlterarsenha");


const configEmail = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: config.email,
    pass: config.pass,
  },
});

 function sendEmail(email, link) {
    configEmail.sendMail({
    from: config.email,
    to: email,
    subject: "Confirmação de Alteração de Senha!",
    html: emailHtml(`http://localhost:8080/resetPass/?jwt=${link}`),
  });
};

module.exports = sendEmail