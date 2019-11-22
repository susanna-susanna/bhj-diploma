/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  let formData = new FormData();

  xhr.responseType = options.responseType;
  xhr.withCredentials = true;

  if (options.method === 'GET') {
    options.url = options.url + '?';
    for (let key in options.data) {
      options.url += `${key}=${options.data[key]}&`;
    }
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  }

    xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      let response = xhr.response;
      options.callback(err = null, response);
      console.log(err);
      console.log(response);
    }
  });

  xhr.open(options.method, options.url);

  try {
    xhr.send(formData);
  } catch (err) {
    callback(err);
  }

  return xhr;

};



