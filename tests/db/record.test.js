const Record = require('../../app/db/record');
const setup = require('./setup');
const db = require('../../app/db');
const timeMachine = require('timemachine');

//mock date
timeMachine.config({
  dateString: 'April 21, 2018 08:00:00',
});

describe('test db record table', () => {
  beforeEach(async () => {
    await setup();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test('clock in should return record id', async () => {
    const id = await Record.clockIn('test');
    expect(id[0]).toBe(21);
  });

  test('clock out should return 1', async () => {
    await Record.clockIn('test');
    const result = await Record.clockOut('test');
    expect(result).toBe(1);
  });

  test('find all should return 20 record', async () => {
    const records = await Record.findAll('test');
    expect(records.length).toBe(20);
  });

  test('find by date range should return 5 record', async () => {
    const startDate = '2018-04-10';
    const endDate = '2018-04-15';
    const records = await Record.findByDateRange('test', startDate, endDate);
    expect(records.length).toBe(5);
  });

  test('find latest should return correctly data', async () => {
    const record = await Record.findLatest('test');
    expect(record).toEqual({
      in: new Date('2018-04-20T00:00:00.000Z'),
      out: new Date('2018-04-20T10:00:00.000Z'),
    });
  });

  test('get list 1 should return correctly data', async () => {
    const records = await Record.getList('test', 1);
    expect(records.length).toBe(10);
    const expectRecords = [];
    for (let i = 20; i > 10; i--) {
      expectRecords.push({
        id: i,
        in: new Date(`2018-04-${i} 08:00:00`),
        out: new Date(`2018-04-${i} 18:00:00`),
      });
    }
    expect(records).toEqual(expectRecords);
  });

  test('get list 2 should return correctly data', async () => {
    const records = await Record.getList('test', 2);
    expect(records.length).toBe(10);
    const expectRecords = [];
    for (let i = 10; i > 0; i--) {
      expectRecords.push({
        id: i,
        in: new Date(`2018-04-${i} 08:00:00`),
        out: new Date(`2018-04-${i} 18:00:00`),
      });
    }
    expect(records).toEqual(expectRecords);
  });

  test('get status should return correct status ', async () => {
    let record = await Record.getStatus('user');
    expect(record).toBeUndefined();
    await Record.clockIn('user');
    record = await Record.getStatus('user');
    expect(record).toEqual({ in: new Date('2018-04-21T00:00:00.000Z') });
  });
});
