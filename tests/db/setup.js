const db = require('../../app/db/index');

async function setup() {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
}

module.exports = setup;
