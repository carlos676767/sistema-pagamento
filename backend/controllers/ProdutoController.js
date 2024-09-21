const config = require("../../config.json");
const products = require("../models/products");

class ProdutoController {
  static  async listProduct(req, res) {
    try {
      const product = await products.find();
      res.send({ status: 200, list: product }).status(404);
    } catch (error) {
      res.status(404).send({ msg: "impossible to query data 404" });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { nome, valor } = req.body;
      const productFind = await products.findOne({ nome: nome });

      if ( productFind == null) {
        res.status(404).send({ msg: "The sent data was not found 404" }) ;
        return 
      }

      productFind.valor = valor;
      productFind.save();
      res.status(200).send({ status: 200, msg: "items updated successfully." });
    } catch (error) {
      res.status(204).send({ status: 204, msg: "an unexpected error occurred" });
    }
  }

  static async cadastrarProduct(req, res) {
    try {
      const { nome, valor, descricao, url } = req.body;

      if ((!nome && !valor, !descricao, !url)) {
        throw new Error("the data must be entered.")
      }

      const produto = new products({
        nome: nome,
        valor: valor,
        descricao: descricao,
        url: url,
      });
      
      await produto.save();
      res.status(200).send({ status: 200, msg: "data placed successfully" });
    } catch (error) {
      res.status(404).send({ status: 404, msg: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { nome } = req.body;
      await products.deleteOne({ nome: nome });
      res.send({ msg: "value deleted successfully", deleted: true }).status(200);
    } catch (error) {
      res.send({ msg: "an error has occurred", deleted: false }).status(404);
    }
  }
};

module.exports = ProdutoController;
