import configs from '../configs';
import {
  AsyncStorage
  } from 'react-native';

const methods = ['get', 'post', 'put', 'patch', 'delete'];

function formatUrl(path) {
  let adjustedPath = path[0] !== '/' ? '/' + path : path;
  adjustedPath = configs.apiRoot + adjustedPath;
  return adjustedPath;
}

function getSaveKey(endpoint, params, data) {
  return endpoint + getStringParams(params) + getStringParams(data)
}

function getStringParams(data) {
  let result = '';
  if (data) {
    for (let key in data) {
      result += `&${key}=${data[key]}`;
    }
  }
  return result;
}

export default class ApiClient {

  constructor() {

    methods.forEach((method) =>

      this[method.toLowerCase()] = (endpoint, { params, data, headers ,auth, saved,saveKey} = {}) => {


        let path = formatUrl(endpoint);

        let options = {
          method: method.toUpperCase()
        };

        if (headers) {
          options.headers = headers
        }

        if (auth) {
          const bearerToken = storage.get(configs.authToken).access_token;
          options.headers = Object.assign({}, options.headers, {
            'Authorization': 'Bearer ' + bearerToken
          });
        }

        if (params) {
          let queryString = '?_t=' + new Date().getTime();

          path += queryString + getStringParams(params);
        }

        if (data) {
          options.body = getStringParams(data).substr(1);
        }
        if (saved) {
          let storeKey = saveKey || getSaveKey(endpoint, params, data);
          return new Promise((resolve, reject) => {
            try {
              AsyncStorage.getItem(storeKey).then(source=>JSON.parse(source)).then(res=> {
                if (!res) {
                  fetch(path, options)
                    .then((response)=>response.json())
                    .then(responseJSON=> {
                      AsyncStorage.setItem(storeKey, JSON.stringify(responseJSON));
                      resolve(responseJSON);
                    })
                }
                else {
                  resolve(res);
                }
              })
            } catch (error) {
              reject(error);
            }
          });

        } else {
          return fetch(path, options).then(res=>res.json());
        }

      })
  }
}
