const mongose = require("mongoose");
const config = require("../../config.json");
const DbInfo = {
  url: config.urlDb,
};

const connectDb = async () => {
  try {
    await mongose.connect(DbInfo.url);
    console.log("db connect.");
  } catch (error) {
    console.error("unexpected error");
  }
};

module.exports = connectDb;