/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('applications', (table) => {
    table.string('interview_date').nullable();
    table.string('interview_time').nullable();
    table.string('interview_mode').nullable(); // 'Online' or 'Offline'
    table.string('meeting_link').nullable();
    table.string('venue').nullable();
    table.string('interviewer_name').nullable();
    table.string('interviewer_email').nullable();
    table.text('instructions').nullable();
    table.boolean('email_sent').notNullable().defaultTo(false);
    table.timestamp('email_sent_at').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('applications', (table) => {
    table.dropColumn('interview_date');
    table.dropColumn('interview_time');
    table.dropColumn('interview_mode');
    table.dropColumn('meeting_link');
    table.dropColumn('venue');
    table.dropColumn('interviewer_name');
    table.dropColumn('interviewer_email');
    table.dropColumn('instructions');
    table.dropColumn('email_sent');
    table.dropColumn('email_sent_at');
  });
};
