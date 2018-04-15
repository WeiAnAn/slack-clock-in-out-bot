const db = require('../db');

async function getStatus(user) {
  const records = await db('records')
    .select('in')
    .where({ user })
    .whereNull('out');
  return records[0];
}

async function clockIn(user) {
  return await db('records').insert({
    user: user,
    in: new Date(),
  });
}

async function clockOut(user) {
  return await db('records')
    .where({ user })
    .whereNull('out')
    .update({ out: new Date() });
}

async function findLatest(user) {
  return await db('records')
    .where({ user })
    .orderBy('out', 'desc')
    .first('in', 'out');
}

async function update(id, user, type, datetime) {
  const revertType = type === 'in' ? 'out' : 'in';
  const compare = type === 'in' ? '>' : '<';

  return await db('records')
    .where({ user: user, id: id })
    .where(revertType, compare, datetime)
    .update(type, datetime);
}

async function updateToday(user, datetime) {
  return await db('records')
    .where({ user: user })
    .whereNull('out')
    .update('in', datetime);
}

async function findAll(user) {
  return await db('records')
    .where('user', user)
    .whereNotNull('out')
    .select('in', 'out')
    .orderBy('out', 'desc');
}

async function findByDateRange(user, startDate, endDate) {
  return await db('records')
    .select('in', 'out')
    .where('user', user)
    .whereBetween('in', [startDate, endDate])
    .whereNotNull('out')
    .orderBy('out', 'desc');
}

async function getList(user, page) {
  return await db('records')
    .select('id', 'in', 'out')
    .where({ user })
    .whereNotNull('out')
    .orderBy('out', 'desc')
    .limit(10)
    .offset((page - 1) * 10);
}

module.exports = {
  getStatus,
  getList,
  findByDateRange,
  clockIn,
  clockOut,
  findAll,
  updateToday,
  update,
  findLatest,
};
