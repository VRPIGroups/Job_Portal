/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('jobs', (table) => {
      table.integer('assigned_recruiter_id').unsigned().nullable()
        .references('id').inTable('users').onDelete('SET NULL');
    })
    .alterTable('applications', (table) => {
      table.integer('assigned_recruiter_id').unsigned().nullable()
        .references('id').inTable('users').onDelete('SET NULL');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('applications', (table) => {
      table.dropColumn('assigned_recruiter_id');
    })
    .alterTable('jobs', (table) => {
      table.dropColumn('assigned_recruiter_id');
    });
};
