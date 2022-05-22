/* eslint-disable no-console */
const dotenv = require('dotenv');
const UserModel = require('./model/user.model');
const { getSequelize } = require('./sequelize');
const rawFlagSuites = require('./suites/raw-flag/suite');

const env = dotenv.config();
if (env.error) {
  console.error('Environment variables were not recognized. Exit');
  process.exit(1);
}

console.info('-- Start Sequelize performance testing --');

(async () => {
  let sequelize;
  try {
    sequelize = await getSequelize();
    const User = UserModel.init(sequelize);
    await sequelize.sync({ force: true });

    await rawFlagSuites.suite10(User);
    await rawFlagSuites.suite100(User);
    await rawFlagSuites.suite1000(User);
    await rawFlagSuites.suite10000(User);
    await rawFlagSuites.suite100000(User);
  } catch (error) {
    console.error(error.message);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
})();
