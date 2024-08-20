const { Schema, default: mongoose } = require("mongoose");

const TempDados = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    codigo: {type: String, required: true}
})


module.exports = mongoose.model("temp", TempDados);