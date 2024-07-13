
const mongose = require("mongoose");

const DbInfo = {
    collection: "pagamentos",
    url: `mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/pagamentos`
}

const connectDb = async () => {
  try {
   await mongose.connect(DbInfo.url)
  } catch (error) {
    console.error("unexpected error")
  }
};

module.exports = connectDb


