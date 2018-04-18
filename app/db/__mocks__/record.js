const records = [];
for (let i = 20; i > 0; i--) {
  records.push({
    id: i,
    in: new Date(`2018-04-${i} 08:00:00`),
    out: new Date(`2018-04-${i} 18:00:00`),
  });
}

const getStatus = jest
  .fn()
  .mockReturnValueOnce()
  .mockReturnValueOnce({ in: new Date('2018-04-20 08:00:00') })
  .mockImplementationOnce(() => {
    throw new Error('error');
  });

const clockIn = jest
  .fn()
  .mockReturnValueOnce([1])
  .mockReturnValueOnce()
  .mockImplementationOnce(() => {
    throw new Error('error');
  });

const clockOut = jest
  .fn()
  .mockReturnValueOnce(1)
  .mockReturnValueOnce(0)
  .mockImplementationOnce(() => {
    throw new Error('error');
  });

async function findLatest(user) {
  return {
    in: new Date('2018-04-20T00:00:00.000Z'),
    out: new Date('2018-04-20T10:00:00.000Z'),
  };
}

const update = jest
  .fn()
  .mockReturnValueOnce(1)
  .mockReturnValueOnce(0)
  .mockImplementationOnce(() => {
    throw new Error('erorr');
  });

async function updateToday(user, datetime) {
  return 1;
}

const findAll = jest
  .fn()
  .mockReturnValueOnce(records)
  .mockReturnValueOnce([])
  .mockImplementationOnce(() => {
    throw new Error('error');
  });

async function findByDateRange(user, startDate, endDate) {
  let records = [];
  for (let i = 15; i > 10; i--) {
    records.push({
      id: i,
      in: new Date(`2018-04-${i} 08:00:00`),
      out: new Date(`2018-04-${i} 18:00:00`),
    });
  }
  return records;
}

const getList = jest
  .fn()
  .mockReturnValueOnce(records.slice(0, 10))
  .mockReturnValueOnce(records.slice(10, 20))
  .mockImplementationOnce(() => {
    throw new Error('error');
  });

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
