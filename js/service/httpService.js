const HttpService = class {
  constructor() {}

  getTemplate() {
    let template = `
    import axios from "axios";

    const httpService = axios.create({
      baseURL: process.env.VUE_APP_BASE_URL || "http://localhost",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    export default httpService;
    `;

    return template;
  }
};

module.exports = HttpService;
