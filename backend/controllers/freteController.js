const FreteHelper = require("../utils/FreteHelper");
const NominateApi = require("../utils/NominatinApi");
const RouterProjectApi = require("../utils/RouterProjectApi");
const freteHelper = new FreteHelper({Nominate: NominateApi, RouterProject: RouterProjectApi});


class FreteController {
  static latSorrisoMt = -12.576666;
  static lonSorrisoMt = -56.738939;
  static async postCalculeFrete(req, res) {
    try {
      const { cidade } = req.body;
      if (!cidade) throw new Error("insira uma cidade.");
      const { lon, lat } = await freteHelper.obterCoordenadas(cidade);
      const cooderdenadas = {
        lon1: lon,
        lat1: lat,
        lon2: FreteController.lonSorrisoMt,
        lat2: FreteController.latSorrisoMt,
      };
      const calculeCity = await freteHelper.calcularFrete(cooderdenadas);
      res.status(200).send({ frete: calculeCity });
    } catch (error) {
      res.status(404).send({ err: error.message });
      console.error("Erro ao calcular a distância:", error);
    }
  }
}

module.exports = FreteController;
