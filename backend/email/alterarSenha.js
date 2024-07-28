const nodemailer = require("nodemailer");
const config = require("../../config.json");
const emailHtml = require("./emailConfirmAlterarsenha");
// const randomCod = () => {
//   let cod = "";
//   let i = 0;
//   while (i < 8) {
//     cod += Math.floor(Math.random() * 10 + 1);
//     ++i;
//   }
//   return cod;
// };

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