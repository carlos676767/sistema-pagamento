const { Schema, default: mongoose } = require("mongoose");

const RegisterPerson = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true}
})

module.exports = mongoose.model("registro", RegisterPerson);