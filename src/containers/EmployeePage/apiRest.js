import config from '../../config';


console.log(config);
const root = `${config.api.url}/api/employee`;

export const apiRest = {
  root,
};
