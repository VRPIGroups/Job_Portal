/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('interviews', (table) => {
      table.string('duration').nullable().defaultTo('60 minutes');
      table.string('timezone').nullable().defaultTo('IST (UTC+5:30)');
      table.string('attendance_status').nullable().defaultTo('Pending'); // 'Pending', 'Confirmed', 'Present', 'Absent'
      table.string('meeting_id').nullable();
      table.string('meeting_passcode').nullable();
      table.string('meeting_platform').nullable().defaultTo('Google Meet');
      table.string('building_name').nullable();
      table.string('floor_number').nullable();
      table.string('room_number').nullable();
      table.string('google_maps_link').nullable();
      table.string('contact_person').nullable();
    })
    .alterTable('interview_feedback', (table) => {
      table.integer('technical_rating').nullable();
      table.integer('communication_rating').nullable();
      table.integer('problem_solving_rating').nullable();
      table.text('strengths').nullable();
      table.text('weaknesses').nullable();
      table.string('recommendation').nullable(); // 'Strongly Recommend', 'Recommend', 'Hold', 'Reject'
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('interview_feedback', (table) => {
      table.dropColumn('technical_rating');
      table.dropColumn('communication_rating');
      table.dropColumn('problem_solving_rating');
      table.dropColumn('strengths');
      table.dropColumn('weaknesses');
      table.dropColumn('recommendation');
    })
    .alterTable('interviews', (table) => {
      table.dropColumn('duration');
      table.dropColumn('timezone');
      table.dropColumn('attendance_status');
      table.dropColumn('meeting_id');
      table.dropColumn('meeting_passcode');
      table.dropColumn('meeting_platform');
      table.dropColumn('building_name');
      table.dropColumn('floor_number');
      table.dropColumn('room_number');
      table.dropColumn('google_maps_link');
      table.dropColumn('contact_person');
    });
};
