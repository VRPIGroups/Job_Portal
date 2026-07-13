/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. Create interviewer_details table
    .createTable('interviewer_details', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').nullable();
      table.string('designation').nullable();
      table.string('department').nullable();
      table.timestamps(true, true);
    })
    // 2. Create interview_rounds table
    .createTable('interview_rounds', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('round_name').notNullable(); // e.g. 'Technical Round', 'Managerial Round', 'HR Round', 'Final Round'
      table.integer('round_number').notNullable().defaultTo(1);
      table.string('status').notNullable().defaultTo('Scheduled'); // Scheduled, Completed, Rescheduled, Cancelled, Passed, Failed
      table.timestamps(true, true);
    })
    // 3. Create interview_history table
    .createTable('interview_history', (table) => {
      table.increments('id').primary();
      table.integer('interview_id').unsigned().notNullable()
        .references('id').inTable('interviews').onDelete('CASCADE');
      table.integer('interview_round_id').unsigned().nullable()
        .references('id').inTable('interview_rounds').onDelete('CASCADE');
      table.string('status').notNullable();
      table.integer('changed_by_user_id').unsigned().nullable()
        .references('id').inTable('users').onDelete('SET NULL');
      table.text('remarks').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 4. Alter interviews table
    .alterTable('interviews', (table) => {
      table.integer('interview_round_id').unsigned().nullable()
        .references('id').inTable('interview_rounds').onDelete('SET NULL');
      table.integer('interviewer_detail_id').unsigned().nullable()
        .references('id').inTable('interviewer_details').onDelete('SET NULL');
      table.integer('round_number').nullable();
      table.string('interviewer_designation').nullable();
      table.string('department').nullable();
    })
    // 5. Alter interview_feedback table
    .alterTable('interview_feedback', (table) => {
      table.integer('interview_round_id').unsigned().nullable()
        .references('id').inTable('interview_rounds').onDelete('SET NULL');
      table.integer('leadership_rating').nullable();
      table.integer('teamwork_rating').nullable();
      table.text('recruiter_remarks').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('interview_feedback', (table) => {
      table.dropColumn('recruiter_remarks');
      table.dropColumn('teamwork_rating');
      table.dropColumn('leadership_rating');
      table.dropColumn('interview_round_id');
    })
    .alterTable('interviews', (table) => {
      table.dropColumn('department');
      table.dropColumn('interviewer_designation');
      table.dropColumn('round_number');
      table.dropColumn('interviewer_detail_id');
      table.dropColumn('interview_round_id');
    })
    .dropTableIfExists('interview_history')
    .dropTableIfExists('interview_rounds')
    .dropTableIfExists('interviewer_details');
};
