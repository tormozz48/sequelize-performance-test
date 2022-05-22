/* eslint-disable no-console */
const { Sequelize } = require('sequelize');

let sequelize;

exports.getSequelize = async () => {
  if (sequelize) {
    return sequelize;
  }

  console.debug(`Database host: ${process.env.DATABASE_HOST}`);
  console.debug(`Database port: ${process.env.DATABASE_PORT}`);
  console.debug(`Database name: ${process.env.DATABASE_NAME}`);

  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: 'postgres',
      logging: false,
    },
  );

  try {
    await sequelize.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database. Exit');
    process.exit(1);
  }

  return sequelize;
};

exports.close = async () => {
  console.info('Close connection to database');
  await sequelize.close();
};
