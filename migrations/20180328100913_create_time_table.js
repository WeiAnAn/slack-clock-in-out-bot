exports.up = function(knex, Promise) {
  return knex.schema.createTable('records', table => {
    table.increments();
    table.string('user');
    table.dateTime('in');
    table.dateTime('out');
    table.index('user');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('records');
};
