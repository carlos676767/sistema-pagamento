
const queryString = require("querystring")
const jsonConfig = require("../../config.json")
const axios = require("axios")
class OauthGitHub {
  static async generaterLinkGiThub(req, res) {
    const objectDados = {
      client_id: jsonConfig.client_id,
      redirect_uri: "http://localhost:8080/sucessoGitHub.html",
      scope: "user repor",
    };
    const url = queryString.stringify(objectDados);
    const link = `https://github.com/login/oauth/authorize?${url}`;
    res.status(200).send({ link: link });
  }

  static async TokenFromSucessGit(req, res) {
    try {
      const { token } = req.body;
      const dados = {
        client_id: jsonConfig.client_id,
        client_secret: jsonConfig.cliente_secret,
        code: token,
      };
      const urlToken = queryString.stringify(dados);
      const httpRquest = await axios.post(
        `https://github.com/login/oauth/access_token?${urlToken}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const myToken = httpRquest.data.split("&")[0].split("=")[1];
      const acessUser = await OauthGitHub.acessUser(myToken)
      console.log(acessUser);
    }catch(error) {
        res.status(404).send({msg: 'an unexpected error occurred'})
    }
  }

  static async acessUser(code, req, res) {
    try {
      const httpPersonDados = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      });
      return httpPersonDados
    } catch (error) {
       res.status(404).send({msg: 'an unexpected error occurred'})
    }
  }
}

module.exports = OauthGitHub