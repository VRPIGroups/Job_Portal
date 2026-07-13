/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // 1. Roles Lookup Table
    .createTable('roles', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.text('description').nullable();
    })
    // 2. Job Categories CRUD Table
    .createTable('job_categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.text('description').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 3. Locations CRUD Table
    .createTable('locations', (table) => {
      table.increments('id').primary();
      table.string('state').notNullable();
      table.string('city').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.unique(['state', 'city']);
    })
    // 4. Users Table (with email verification fields)
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique().index();
      table.string('phone').nullable();
      table.string('password').notNullable();
      table.string('role').notNullable().defaultTo('candidate'); // 'candidate' or 'admin'
      table.string('profile_image').nullable();
      table.boolean('is_blocked').notNullable().defaultTo(false);
      table.boolean('is_verified').notNullable().defaultTo(false);
      table.string('verification_token').nullable();
      table.timestamp('verification_token_expires').nullable();
      table.timestamps(true, true); // created_at, updated_at
    })
    // 5. Companies Table (with alter details incorporated)
    .createTable('companies', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('logo').nullable();
      table.string('website').nullable();
      table.text('description').nullable();
      table.string('email').nullable();
      table.string('phone').nullable();
      table.string('industry').nullable();
      table.string('address').nullable();
      table.string('banner').nullable();
      table.timestamps(true, true);
    })
    // 6. Recruiters Table
    .createTable('recruiters', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.integer('company_id').unsigned().notNullable()
        .references('id').inTable('companies').onDelete('CASCADE');
      table.string('position').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 7. Resumes Table
    .createTable('resumes', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('filename').notNullable();
      table.string('filepath').notNullable();
      table.integer('size').notNullable(); // in bytes
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 8. Jobs Table (incorporates category_id and location_id from the start)
    .createTable('jobs', (table) => {
      table.increments('id').primary();
      table.integer('company_id').unsigned().notNullable()
        .references('id').inTable('companies').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.integer('salary_min').notNullable();
      table.integer('salary_max').notNullable();
      table.string('job_type').notNullable(); // Full Time, Part Time, Internship, Contract, Remote
      table.string('location').notNullable();
      table.string('experience').notNullable();
      table.string('status').notNullable().defaultTo('active'); // active, inactive
      table.integer('category_id').unsigned().nullable()
        .references('id').inTable('job_categories').onDelete('SET NULL');
      table.integer('location_id').unsigned().nullable()
        .references('id').inTable('locations').onDelete('SET NULL');
      table.timestamps(true, true);
    })
    // 9. Applications Table
    .createTable('applications', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.integer('job_id').unsigned().notNullable()
        .references('id').inTable('jobs').onDelete('CASCADE');
      table.string('resume').notNullable();
      table.string('skills').nullable();
      table.text('cover_letter').nullable();
      table.string('status').notNullable().defaultTo('Applied'); // Applied, Under Review, Shortlisted, etc.
      table.timestamps(true, true);
    })
    // 10. Skills Table
    .createTable('skills', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 11. Job Skills Table
    .createTable('job_skills', (table) => {
      table.increments('id').primary();
      table.integer('job_id').unsigned().notNullable()
        .references('id').inTable('jobs').onDelete('CASCADE');
      table.integer('skill_id').unsigned().notNullable()
        .references('id').inTable('skills').onDelete('CASCADE');
    })
    // 12. Contact Messages Table
    .createTable('contact_messages', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('company_name').notNullable();
      table.string('email').notNullable();
      table.string('business_number').notNullable();
      table.string('company_address').notNullable();
      table.text('message').notNullable();
      table.timestamps(true, true);
    })
    // 13. Saved Jobs Table
    .createTable('saved_jobs', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.integer('job_id').unsigned().notNullable()
        .references('id').inTable('jobs').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.index(['user_id']);
      table.index(['job_id']);
      table.unique(['user_id', 'job_id']);
    })
    // 14. Notifications Table
    .createTable('notifications', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('title').notNullable();
      table.text('message').notNullable();
      table.string('type').nullable();
      table.boolean('is_read').notNullable().defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 15. Email Verifications Table
    .createTable('email_verifications', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('token').notNullable().unique();
      table.timestamp('expires_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 16. Password Resets Table
    .createTable('password_resets', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('token').notNullable().unique();
      table.timestamp('expires_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 17. Refresh Tokens Table
    .createTable('refresh_tokens', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('token').notNullable().unique();
      table.timestamp('expires_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 18. Email Templates Table
    .createTable('email_templates', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('subject').notNullable();
      table.text('body').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('email_templates')
    .dropTableIfExists('refresh_tokens')
    .dropTableIfExists('password_resets')
    .dropTableIfExists('email_verifications')
    .dropTableIfExists('notifications')
    .dropTableIfExists('saved_jobs')
    .dropTableIfExists('contact_messages')
    .dropTableIfExists('job_skills')
    .dropTableIfExists('skills')
    .dropTableIfExists('applications')
    .dropTableIfExists('jobs')
    .dropTableIfExists('resumes')
    .dropTableIfExists('recruiters')
    .dropTableIfExists('companies')
    .dropTableIfExists('users')
    .dropTableIfExists('locations')
    .dropTableIfExists('job_categories')
    .dropTableIfExists('roles');
};
