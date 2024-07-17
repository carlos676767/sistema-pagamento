const nodemailer = require("nodemailer");
const jsonConfig = require("../../config.json");
const html = require("./emailConfirm");
const randomCod = () => {
  let cod = "";
  for (let i = 1; i < 6; i++) {
    const codConfirm = Math.floor(Math.random() * 30);
    cod += codConfirm;
  }
  return cod
};


const configEmail = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: jsonConfig.email,
    pass: jsonConfig.pass,
  }
});

const sendEmail = async (email) => {
  try {
   const send = await configEmail.sendMail({
    from: jsonConfig.email,
    to: "kifoce6232@modotso.com",
    subject: "✉️ Confirmação de E-mail Necessária!",
    html: html(randomCod())
   })
  } catch (error) {
    console.error(error)
  }
};

(async() => {
   await sendEmail()
})();