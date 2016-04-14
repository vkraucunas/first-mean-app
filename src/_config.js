var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/first-mean-app',
  test: 'mongodb://localhost/first-mean-app-testing',
  production: process.env.MONGODB_URI
};
// config.SALT_WORK_FACTOR = {
//     test: 10,
//     development: 10,
//     production: 12
// }

config.SALT_WORK_FACTOR = 10;

config.TOKEN_SECRET = 'mxdax81x96kGxdfx86xc2x9cxb3xfdx14axfcx06xd2x0f';

module.exports = config;