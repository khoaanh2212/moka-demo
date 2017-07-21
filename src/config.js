require('babel-polyfill');

console.log(process.env.NODE_ENV);
const environment = {
  development: {
    isProduction: false,
    api: {
      host: 'http://localhost',
      port: 8000,
      url: 'http://localhost:8000',
    },
  },
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
