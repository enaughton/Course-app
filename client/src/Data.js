import config from "./config";

export default class Data {
  api(path, method = "GET", body = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    console.log(url, options);
    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api("/api/courses", "GET", null);
    if (response.status === 200) {
      return response.json().then(data => data);
    } else {
      throw new Error();
    }
  }
}
