class RouterProjectApi {
  static url = `http://router.project-osrm.org/route/v1/driving/`;
  static async getKm({ lon1, lat1, lon2, lat2 }) {
    try {
      const routeUrl = `${lon1},${lat1};${lon2},${lat2}?overview=false`;
      const response = await fetch(RouterProjectApi.url.concat(routeUrl));
      return response.json();
    } catch (error) {
      throw new Error("error ao obter km");
    }
  }
}

module.exports = RouterProjectApi;
