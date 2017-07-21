import * as Urls from './Urls';
const responseObject = require('../models/Response');
import Account from '../models/Account';
export function getMovies() {
  return fetch(Urls.URL_GET_EX)
        .then((response) => response.json())
        .then((responseJson) => responseJson.movies)
        .catch((error) => {
          console.error(error);
        });
}
