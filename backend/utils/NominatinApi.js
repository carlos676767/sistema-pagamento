

class NominateApi {
  static url = `https://nominatim.openstreetmap.org/`;
  static async obterCoordenadas(cidade) {
    try {
      const response = await fetch( NominateApi.url.concat(`search?q=${cidade}&format=json`)  );
      return response.json();
    } catch (error) {
      throw new Error("erro ao obter coordenadas.");
    }
  }
}

module.exports = NominateApi
