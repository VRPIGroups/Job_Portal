/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. Interviews Table
    .createTable('interviews', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('interview_date').notNullable(); // YYYY-MM-DD
      table.string('interview_time').notNullable(); // HH:MM
      table.string('interview_type').notNullable(); // 'Online' or 'Offline'
      table.string('meeting_link').nullable();
      table.string('venue').nullable();
      table.string('interviewer_name').notNullable();
      table.string('interviewer_email').nullable();
      table.string('interview_round').notNullable(); // e.g., 'Technical Round 1', 'HR Round'
      table.text('additional_instructions').nullable();
      table.string('status').notNullable().defaultTo('Scheduled'); // 'Scheduled', 'Completed', 'Cancelled'
      table.timestamps(true, true);
    })
    // 2. Interview Feedback Table
    .createTable('interview_feedback', (table) => {
      table.increments('id').primary();
      table.integer('interview_id').unsigned().notNullable()
        .references('id').inTable('interviews').onDelete('CASCADE');
      table.string('interviewer_name').notNullable();
      table.text('feedback_text').notNullable();
      table.integer('rating').nullable(); // e.g., 1-5
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 3. Application Status History Table
    .createTable('application_status_history', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('status').notNullable();
      table.integer('changed_by_user_id').unsigned().nullable()
        .references('id').inTable('users').onDelete('SET NULL');
      table.text('remarks').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 4. Candidate Notes (Recruiter Private Notes)
    .createTable('candidate_notes', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.integer('recruiter_user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.text('note_text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 5. Resume Data (Parsed Resume details)
    .createTable('resume_data', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().notNullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('name').nullable();
      table.string('email').nullable();
      table.string('phone').nullable();
      table.text('skills').nullable();
      table.text('experience').nullable();
      table.text('education').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 6. Email Logs Table
    .createTable('email_logs', (table) => {
      table.increments('id').primary();
      table.integer('application_id').unsigned().nullable()
        .references('id').inTable('applications').onDelete('CASCADE');
      table.string('to_email').notNullable();
      table.string('subject').notNullable();
      table.text('body').notNullable();
      table.string('status').notNullable(); // 'Sent', 'Failed'
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('email_logs')
    .dropTableIfExists('resume_data')
    .dropTableIfExists('candidate_notes')
    .dropTableIfExists('application_status_history')
    .dropTableIfExists('interview_feedback')
    .dropTableIfExists('interviews');
};
