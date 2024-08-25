class FreteHelper {
  constructor(apis) {
    this.apis = apis
  }
  async obterCoordenadas(cidade) {
    try {
      const resposta = await this.apis.Nominate.obterCoordenadas(cidade)
      const { lat, lon } = resposta[0];
      return { lat, lon };
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      throw new Error("Erro ao obter coordenadas");
    }
  }

  async calcularFrete(cooderdenadas) {
    try {
      const response = await this.apis.RouterProject.getKm(cooderdenadas)
      const { distance } = response.routes[0];
      const valorPorKm = Math.floor((distance / 1000) * 0.1).toString().slice(0, 2);
      const valorFinal = Number(valorPorKm)
      return valorFinal;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao calcular a distância:");
    }
  }
}

module.exports = FreteHelper