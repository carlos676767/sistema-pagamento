
class MongooseDatabase{
  static #configDb = require("../../config.json")
  static #mongose = require("mongoose");
  static async connectDataBase(){
    try {
      await this.#mongose.connect(this.#configDb.urlDb)
    } catch (error) {
      console.log(error)
      throw new Error("Database nao foi possivel se connectar.")
    }
  }
}

module.exports = MongooseDatabase