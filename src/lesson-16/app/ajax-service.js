export class AjaxService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', this.baseUrl, true);

      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.status, xhr.statusText);
          }
        }
      };
    });
  }

  post(requestBody) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', this.baseUrl, true);

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify(requestBody));

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.status, xhr.statusText);
          }
        }
      };
    });
  }

  put(id, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', `${this.baseUrl}/${id}`, true);

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.status, xhr.statusText);
          }
        }
      };
    })
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('delete', `${this.baseUrl}/${id}`, true);

      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.status, xhr.statusText);
          }
        }
      };
    })
  }
}