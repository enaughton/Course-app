import config from "./config";

// Data file has some Helper Functions and works along side of Context

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
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

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  // getUser is used to GET User Data
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  // createUser is used to Create a User
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    console.log(response);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
  // deleteCourse is used to Delete a Course
  async deleteCourse(course, username, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "DELETE",
      course,
      true,

      {
        username,
        password
      }
    );
    console.log(response);
    if (response.status === 204) {
      return [];
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data.errors.err.errors;
      });
    } else {
      throw new Error();
    }
  }
  // createCourse is used to Create a Course
  async createCourse(course, username, password) {
    const response = await this.api(`/courses/`, "POST", course, true, {
      username,
      password
    });
    console.log(response);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
  // updateCourse is used to Update a Course
  async updateCourse(course, username, password) {
    const response = await this.api(
      `/courses/${course.course}`,
      "PUT",
      course,
      true,
      {
        username,
        password
      }
    );
    console.log(response);
    if (response.status === 204) {
      return [];
    } else if (response.status === 401) {
      return null;
    } else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data);
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
}
