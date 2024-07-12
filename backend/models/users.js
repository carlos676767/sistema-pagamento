const { Schema, default: mongoose } = require("mongoose");
const users = new Schema({
  name: {type: String, required: true},
  senha: {type: String, required: true},
});

module.exports = mongoose.model("usuarios", users)