
const mongose = require("mongoose");

const DbInfo = {
    url: `mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/produtos`
}

const connectDb = async () => {
  try {
   await mongose.connect(DbInfo.url)
  } catch (error) {
    console.error("unexpected error")
  }
};

module.exports = connectDb


