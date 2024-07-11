
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

const produto = new Product({
    nome: "carlos",
    valor: 444
})

const newConnection = async () => {
  try {
   await mongose.connect(DbInfo.url)
   await produto.save()
   
  } catch (error) {

  }
};



module.exports = newConnection

