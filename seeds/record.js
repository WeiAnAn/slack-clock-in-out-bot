exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('records')
    .del()
    .then(function() {
      // Inserts seed entries
      let records = [];
      for (let i = 0; i < 20; i++) {
        records.push({
          id: i + 1,
          user: 'test',
          in: `2018-04-${i + 1} 08:00:00`,
          out: `2018-04-${i + 1} 18:00:00`,
        });
      }
      return knex('records').insert(records);
    });
};
