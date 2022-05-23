const faker = require('faker');
const {
  add, complete, cycle, suite,
} = require('benny');

async function fillUsers(User, n) {
  const userData = [];
  for (let i = 0; i < n; i += 1) {
    userData.push({
      firstName: faker.lorem.word(),
      lastName: faker.lorem.word(),
      email: faker.lorem.word(),
      age: Math.round(100 * Math.random()),
      sex: faker.datatype.boolean(),
      address: faker.lorem.words(),
    });
  }
  await User.destroy({ truncate: true });
  await User.bulkCreate(userData);
}

const options = {
  minSamples: 10,
};

async function makeSuite(User, n) {
  await fillUsers(User, n);

  return suite(
    `Raw Flag Suite. Number of records = ${n}`,

    add('Raw flag disabled', async () => {
      await User.findAll({ raw: false });
    }, options),

    add('Raw flag enabled', async () => {
      await User.findAll({ raw: true });
    }, options),

    cycle(),
    complete(),
  );
}

exports.suite10 = (User) => makeSuite(User, 10);
exports.suite100 = (User) => makeSuite(User, 100);
exports.suite1000 = (User) => makeSuite(User, 1000);
exports.suite10000 = (User) => makeSuite(User, 10000);
exports.suite100000 = (User) => makeSuite(User, 100000);
