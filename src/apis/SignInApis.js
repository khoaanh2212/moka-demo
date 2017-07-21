import * as Urls from './Urls';
const responseObject = require('../models/Response');
import { Token } from '../models/Token';
export function signIn(username, password) {
  return fetch(Urls.URL_SIGN_IN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 2,
      grant_type: 'password',
      username,
      password,
      client_secret: '0cpB3ULcGAfzqSkRvCr8nhTmGQ2op0TPLLwBUqTF',
      scope: '*',
    }),
  })
        .then((response) => response.json())
        .then((responseJson) =>
            // return responseJson.movies;
             new Token(responseJson))
        .catch((error) => {
          console.error(error);
        });
}
