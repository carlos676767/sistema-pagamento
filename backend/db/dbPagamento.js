
const mongose = require("mongoose");


const DbInfo = {
    collection: "pagamentos",
    url: `mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/pagamentos`
}


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

