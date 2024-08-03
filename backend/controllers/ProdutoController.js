const config = require("../../config.json");
const stripe = require("stripe")(config.tokenStripe);
const products = require("../models/products");
class ProdutoController {
  static async postPagamento(req, res) {
    try {
      const { valorUnity } = req.body;
      const centavos = valorUnity * 100;

      const price_data = {
        currency: "brl",
        product_data: { name: "Comidas caseiras" },
        unit_amount: centavos,
      };

      const item = { price_data, quantity: 1 };
      const { url } = await stripe.checkout.sessions.create({
        line_items: [item],
        mode: "payment",
        success_url: "http://localhost:8080/sucesso.html",
        cancel_url: "https://www.invertexto.com/gerador-email-temporario",
      });
      res.status(201).send({ link: "generated payment link", linkToken: url });
    } catch (error) {
      res.status(401).send({ msg: "the link was not generated, try again." });
    }
  }

  static async listProduct(req, res) {
    try {
      const product = await products.find();
      res.send({ status: 200, list: product }).status(404);
    } catch (error) {
      res.status(404).send({ msg: "impossible to query data 404" });
    }
  }

 static async updateProduct(req,res) {
    try {
        const {nome,  valor} = req.body
        const productFind = await products.findOne({nome: nome})
        productFind == null ? res.status(404).send({ msg: "The sent data was not found 404" }):null
        productFind.valor = valor
        productFind.save()
        res.status(200).send({status: 200, msg: "items updated successfully."})
      } catch (error) {
        res.status(204).send({status: 204, msg: "an unexpected error occurred"})
      }
}


static async cadastrarProduct(req,res){
    try {
        const { nome, valor, descricao } = req.body;
        if (!nome && !valor, !descricao) {
          res.send({ falha: "the data must be entered.", status: 404 }) .status(404);
        }
        const produto = new products({nome: nome,  valor: valor, descricao: descricao });
        await produto.save()
        res.status(200).send({ status: 200, msg: "data placed successfully" });
      } catch (error) {
        res.status(404).send({ status: 404, msg: "unexpected error" });
      }
  }



  static async deleteProduct(req, res){
    try {
        const { nome } = req.body;
        await products.deleteOne({ nome: nome });
        res.send({ msg: "value deleted successfully", deleted: true }).status(200);
      } catch (error) {
        res.send({ msg: "an error has occurred", deleted: false }).status(404);
      }
  }


  
}

module.exports = ProdutoController;
