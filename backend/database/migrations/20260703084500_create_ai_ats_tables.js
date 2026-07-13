/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. Resume Analysis Table
    .createTable('resume_analysis', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('full_name').nullable();
      table.string('email').nullable();
      table.string('phone').nullable();
      table.text('experience').nullable();
      table.text('education').nullable();
      table.text('certifications').nullable();
      table.text('projects').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 2. Resume Skills Table
    .createTable('resume_skills', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('skill_name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 3. Application Scores Table
    .createTable('application_scores', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.integer('match_score').notNullable(); // 0 to 100
      table.text('matched_skills').nullable(); // comma-separated or json
      table.text('missing_skills').nullable();
      table.string('ats_recommendation').notNullable(); // 'Recommend', 'Review', 'Reject'
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 4. Interview Schedule Table
    .createTable('interview_schedule', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('interview_date').notNullable();
      table.string('interview_time').notNullable();
      table.string('interview_type').notNullable(); // 'Online', 'Offline'
      table.string('meeting_link').nullable();
      table.string('venue').nullable();
      table.string('interviewer_name').notNullable();
      table.string('interviewer_email').nullable();
      table.string('interview_round').notNullable();
      table.text('additional_instructions').nullable();
      table.string('status').notNullable().defaultTo('Scheduled');
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('interview_schedule')
    .dropTableIfExists('application_scores')
    .dropTableIfExists('resume_skills')
    .dropTableIfExists('resume_analysis');
};
