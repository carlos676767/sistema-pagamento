const nodemailer = require("nodemailer");
const jsonConfig = require("../../config.json");
const html = require("./emailConfirm");
const randomCod = () => {
  return Array.from(Array(4).keys())
    .map((data) => (data += Math.floor(Math.random() * 30)))
    .join("");
};

const configEmail = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: jsonConfig.email,
    pass: jsonConfig.pass,
  }
});

const sendEmail = async (email, codigo) => {
  try {
   const send = await configEmail.sendMail({
    from: jsonConfig.email,
    to: email,
    subject: "✉️ Confirmação de E-mail Necessária!",
    html: html(codigo)
   })
   console.log(send);

  } catch (error) {
    console.error(error)
  }
};

module.exports = {
  sendEmail,
  randomCod
}
