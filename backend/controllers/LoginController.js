const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../../config.json");
const Db = require("../models/registerModel");

class loginUser {
  static verifyJwt(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, SECRET_KEY.secretKey, (err, decod) => {
        if (!err) {
          res.status(200).send({ login: true });
          return;
        };
        next();
      });
    };
    next();
  };

  static async loginPerson(req, res) {
    try {
      const { email, senha } = req.body;
      const searchCredentials = await Db.findOne({ email });
      if (searchCredentials && searchCredentials.senha == senha) {
        const idUser = searchCredentials.id;
        const payLoad = jwt.sign({ idUser }, SECRET_KEY.secretKey, {expiresIn: "60s",   });
        res.status(200).send({ login: true, msg: "data successfully validated.",  jwt: payLoad,  });
      };
      
    } catch (error) {
      res.status(400).send({ login: false, msg: "an error has occurred" });
    }
  }
}

module.exports = loginUser;
