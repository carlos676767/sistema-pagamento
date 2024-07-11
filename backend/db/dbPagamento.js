
const mongose = require("mongoose")
const { Schema  } = mongose;
const DbInfo = {
    collection: "pagamentos",
    url: `mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/pagamentos`
}

const dbName = "pagamentos"
const sheme = new Schema({
    nome: String,
    valor: Number, 
})

const Product = mongose.model("produto", sheme)

const newConnection = async (produto) => {
  try {
   await mongose.connect(DbInfo.url)
   await produto.save()
  } catch (error) {
    console.error("unexpected error")
  }
};

module.exports = {
    Product,
    newConnection
}

