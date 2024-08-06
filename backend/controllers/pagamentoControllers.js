const jsonJwt = require("jsonwebtoken")
const config = require("../../config.json");
const stripe = require("stripe")(config.tokenStripe);
const products = require("../models/products");
class PagamentosItens {
  static async receberIdProduct(req, res) {
    try {
      const { ids } = req.body;
      const generateJwt = jsonJwt.sign({ ids }, config.secretKey, { expiresIn: "10m",});
      res.send({ msg: generateJwt }).status(200);
    } catch (error) {
      res.status(404).send({ msg: "a 404 error occurred" });
    }
  }

  static async verifyIdPaginaPay(req, res) {
    try {
      const { jwt } = req.body;
      jsonJwt.verify(jwt, config.secretKey, async (err, sucess) => {
        if (err) {
          res.status(401).send({  msg: "the time on the page has expired, choose the products again", });
          return ;
        }
        const { ids } = sucess;
        const busqueProduct = await products.find({ _id: { $in: ids } });
        res.status(200).send({ itens: busqueProduct });
      });
    } catch (error) {
      res.status(401).send({ msg: "error 404 Try again later." });
    }
  }

  static async postPagamento(req, res) {
    try {
      const { ids } = req.body;
      const busqueProduct = await products.find({ _id: { $in: ids } });
      const valoresItens = busqueProduct.map((data) => data.valor).reduce((a, cc) => a + cc);
      const centavos = valoresItens * 100;
      const price_data = {
        currency: "brl",
        product_data: { name: "Comidas caseiras" },
        unit_amount: centavos,
      };

      const item = { price_data, quantity: 1 };
      const { id, url } = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        payment_method_types: ["card", "boleto"],
        payment_method_options: {
          boleto: {
            expires_after_days: 7,
          },
        },
        line_items: [item],
        mode: "payment",
        success_url: "http://localhost:8080/pagamentoSucesso.html",
        cancel_url: "http://localhost:8080/pagamentoCaneclado.html",
      });
      res.status(201).send({ link: "generated payment link", linkToken: url });
    } catch (error) {
      res.status(401).send({ msg: "the link was not generated, try again." });
    }
  }

}

module.exports = PagamentosItens