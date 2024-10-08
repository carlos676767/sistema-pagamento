const { Schema, default: mongoose } = require("mongoose");

const produtos = new Schema({
  nome: {type: String, required: true},
  valor: {type: Number, required: true},
  descricao: {type: String, required: true},
  url: {type: String, required: true}
});

module.exports = mongoose.model("produtos", produtos);